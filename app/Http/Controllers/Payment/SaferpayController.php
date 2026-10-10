<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CustomerPackageController;
use App\Http\Controllers\SellerPackageController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use App\Models\CombinedOrder;
use App\Models\CustomerPackage;
use App\Models\Order;
use App\Models\SellerPackage;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Session;

class SaferpayController extends Controller
{
    private function getBaseUrl()
    {
        if (get_setting('saferpay_sandbox') == 1) {
            return 'https://test.saferpay.com/api/Payment/v1';
        }
        return 'https://www.saferpay.com/api/Payment/v1';
    }

    public function pay()
    {
        $amount = 0;
        $paymentType = '';
        $combinedOrderId = '';
        $paymentData = [];

        if (Session::has('payment_type')) {
            $paymentType = Session::get('payment_type');
            $paymentData = Session::get('payment_data');
            if ($paymentType == 'cart_payment') {
                $combined_order = CombinedOrder::findOrFail(Session::get('combined_order_id'));
                $combinedOrderId = $combined_order->id;
                $amount = round($combined_order->grand_total * 100);
            } elseif ($paymentType == 'order_re_payment') {
                $order = Order::findOrFail($paymentData['order_id']);
                $amount = round($order->grand_total * 100);
            } elseif ($paymentType == 'wallet_payment') {
                $amount = round(Session::get('payment_data')['amount'] * 100);
            } elseif ($paymentType == 'customer_package_payment') {
                $customer_package = CustomerPackage::findOrFail($paymentData['customer_package_id']);
                $amount = round($customer_package->amount * 100);
            } elseif ($paymentType == 'seller_package_payment') {
                $seller_package = SellerPackage::findOrFail($paymentData['seller_package_id']);
                $amount = round($seller_package->amount * 100);
            }
        }

        $currency = get_setting('saferpay_currency') ?? \App\Models\Currency::findOrFail(get_setting('system_default_currency'))->code;
        $orderId = uniqid('order_');
        
        // Include context in ReturnUrl to recover from session loss
        $returnUrl = route('saferpay.callback', [
            'payment_type' => $paymentType,
            'combined_order_id' => $combinedOrderId,
            'order_id' => $paymentData['order_id'] ?? '',
            'customer_package_id' => $paymentData['customer_package_id'] ?? '',
            'seller_package_id' => $paymentData['seller_package_id'] ?? '',
            'amount' => $paymentData['amount'] ?? '',
            'user_id' => $paymentData['user_id'] ?? '',
        ]);

        $requestData = [
            'RequestHeader' => [
                'SpecVersion' => '1.48',
                'CustomerId' => env('SAFERPAY_CUSTOMER_ID'),
                'RequestId' => uniqid(),
                'RetryIndicator' => 0,
            ],
            'TerminalId' => env('SAFERPAY_TERMINAL_ID'),
            'Payment' => [
                'Amount' => [
                    'Value' => $amount,
                    'CurrencyCode' => $currency,
                ],
                'OrderId' => $orderId,
                'Description' => 'Payment for order',
            ],
            'ReturnUrl' => [
                'Url' => $returnUrl,
            ],
            'Notification' => [
                'SuccessNotifyUrl' => route('saferpay.notify_success'),
                'FailNotifyUrl' => route('saferpay.notify_fail'),
            ]
        ];

        $response = Http::withBasicAuth(env('SAFERPAY_USERNAME'), env('SAFERPAY_PASSWORD'))
            ->post($this->getBaseUrl() . '/PaymentPage/Initialize', $requestData);

        if ($response->successful()) {
            $data = $response->json();
            Session::put('saferpay_token', $data['Token']);
            return redirect($data['RedirectUrl']);
        }

        Log::error('SaferPay Initialize failed', [
            'status' => $response->status(),
            'body' => $response->json() ?? $response->body(),
        ]);
        flash(translate('SaferPay initialization failed: ') . $response->body())->error();
        return redirect()->route('home');
    }

    public function callback(Request $request)
    {
        try {
            $token = Session::get('saferpay_token');
            if (!$token) {
                Log::error('SaferPay callback: No token found in session');
                // If we have order info in URL, we might still be able to show a useful error
                flash(translate('Your payment session expired. Please check your order history or try again.'))->warning();
                return redirect()->route('home');
            }

            // --- Step 1: Assert ---
            $assertData = [
                'RequestHeader' => [
                    'SpecVersion' => '1.48',
                    'CustomerId' => env('SAFERPAY_CUSTOMER_ID'),
                    'RequestId' => uniqid(),
                    'RetryIndicator' => 0,
                ],
                'Token' => $token,
            ];

            $assertResponse = Http::withBasicAuth(env('SAFERPAY_USERNAME'), env('SAFERPAY_PASSWORD'))
                ->post($this->getBaseUrl() . '/PaymentPage/Assert', $assertData);

            if (!$assertResponse->successful()) {
                $errorBody = $assertResponse->json() ?? [];
                Log::error('SaferPay Assert failed', ['response' => $errorBody]);
                
                $msg = translate('Payment Assert failed. ') . ($errorBody['ErrorMessage'] ?? 'Unknown error');
                flash($msg)->error();
                
                // User wants to see what was returned
                if (get_setting('saferpay_sandbox') == 1) {
                    return response()->json([
                        'error' => 'Assert Failed',
                        'saferpay_response' => $errorBody,
                        'context' => $request->all()
                    ], 400);
                }
                
                return redirect()->route('home');
            }

            $data = $assertResponse->json();
            $transactionStatus = $data['Transaction']['Status'] ?? null;
            $transactionId = $data['Transaction']['Id'] ?? null;

            Log::info('SaferPay Assert success', ['status' => $transactionStatus, 'id' => $transactionId]);

            // --- Step 2: Capture ---
            if ($transactionStatus === 'AUTHORIZED') {
                $captureData = [
                    'RequestHeader' => [
                        'SpecVersion' => '1.48',
                        'CustomerId' => env('SAFERPAY_CUSTOMER_ID'),
                        'RequestId' => uniqid(),
                        'RetryIndicator' => 0,
                    ],
                    'TransactionReference' => [
                        'TransactionId' => $transactionId,
                    ]
                ];

                $captureResponse = Http::withBasicAuth(env('SAFERPAY_USERNAME'), env('SAFERPAY_PASSWORD'))
                    ->post($this->getBaseUrl() . '/Transaction/Capture', $captureData);

                if (!$captureResponse->successful()) {
                    $captureError = $captureResponse->json() ?? [];
                    Log::error('SaferPay Capture failed', ['response' => $captureError]);
                    
                    flash(translate('Payment authorized but capture failed. ID: ') . $transactionId)->error();
                    
                    if (get_setting('saferpay_sandbox') == 1) {
                        return response()->json([
                            'error' => 'Capture Failed',
                            'saferpay_response' => $captureError,
                            'assert_data' => $data
                        ], 400);
                    }
                    return redirect()->route('home');
                }
                
                Log::info('SaferPay Capture success', ['id' => $transactionId]);
            }

            // --- Step 3: Finalize ---
            Session::forget('saferpay_token');
            return $this->finalizePayment($data, $request);

        } catch (\Exception $e) {
            Log::error('SaferPay callback exception: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            
            if (get_setting('saferpay_sandbox') == 1) {
                return response()->json([
                    'error' => 'Internal Server Error',
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ], 500);
            }
            
            flash(translate('An error occurred while processing your payment.'))->error();
            return redirect()->route('home');
        }
    }

    private function finalizePayment($data, Request $request)
    {
        $payment = ["status" => "Success", "transaction_id" => $data['Transaction']['Id'] ?? null];
        
        // Try session first, then GET params
        $payment_type = Session::get('payment_type') ?? $request->payment_type;
        $combined_order_id = Session::get('combined_order_id') ?? $request->combined_order_id;
        $paymentData = Session::get('payment_data') ?? [
            'order_id' => $request->order_id,
            'customer_package_id' => $request->customer_package_id,
            'seller_package_id' => $request->seller_package_id,
            'amount' => $request->amount,
            'user_id' => $request->user_id,
        ];

        if ($payment_type == 'cart_payment') {
            return (new CheckoutController)->checkout_done($combined_order_id, json_encode($payment));
        } else if ($payment_type == 'order_re_payment') {
            return (new CheckoutController)->orderRePaymentDone($paymentData, json_encode($payment));
        } else if ($payment_type == 'wallet_payment') {
            return (new WalletController)->wallet_payment_done($paymentData, json_encode($payment));
        } else if ($payment_type == 'customer_package_payment') {
            return (new CustomerPackageController)->purchase_payment_done($paymentData, json_encode($payment));
        } else if ($payment_type == 'seller_package_payment') {
            return (new SellerPackageController)->purchase_payment_done($paymentData, json_encode($payment));
        }

        Log::warning('SaferPay finalizePayment: unknown payment_type or missing data', [
            'type' => $payment_type,
            'id' => $combined_order_id
        ]);
        return redirect()->route('home');
    }

    public function fail(Request $request)
    {
        flash(translate('Payment failed'))->error();
        return redirect()->route('home');
    }

    public function cancel(Request $request)
    {
        flash(translate('Payment is cancelled'))->error();
        return redirect()->route('home');
    }

    public function notify_success(Request $request)
    {
        return response('OK', 200);
    }

    public function notify_fail(Request $request)
    {
        return response('OK', 200);
    }
}

