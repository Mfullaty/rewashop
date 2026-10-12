<?php

namespace App\Exceptions;

use App\Utility\NgeniusUtility;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        \App\Pos\Exceptions\PosException::class,
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        if ($e instanceof \Illuminate\Validation\ValidationException && $request->is('api/pos/v1/*', 'pos/backend/*')) {
            return response()->json(['error' => ['code' => 'INVALID_REQUEST', 'message' => 'The POS request failed validation.',
                'fields' => $e->errors()]], 422);
        }
        if ($request->is('api/pos/v1/*', 'pos/backend/*')) {
            if ($e instanceof \App\Pos\Exceptions\PosException) { return $e->render($request); }
            if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                return response()->json(['error' => ['code' => 'UNAUTHENTICATED', 'message' => 'Sign in to use the browser POS backend.']], 401);
            }
            if ($e instanceof \Illuminate\Session\TokenMismatchException) {
                return response()->json(['error' => ['code' => 'CSRF_TOKEN_MISMATCH', 'message' => 'Refresh the browser session and retry with a valid CSRF token.']], 419);
            }
            if ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return response()->json(['error' => ['code' => 'NOT_FOUND', 'message' => 'The POS record was not found.']], 404);
            }
            if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface) {
                $status = $e->getStatusCode();
                return response()->json(['error' => ['code' => $status === 429 ? 'RATE_LIMITED' : 'HTTP_ERROR',
                    'message' => $status === 429 ? 'Back off and retry the POS request.' : 'The POS request could not be completed.']], $status, $e->getHeaders());
            }
            return response()->json(['error' => ['code' => 'INTERNAL_ERROR', 'message' => 'The POS request failed. Query sync status before retrying an uncertain event.']], 500);
        }
        if ($e instanceof Redirectingexception) {
            return redirect()->back();
        }

        if($this->isHttpException($e))
        {
            if ($request->is('customer-products/admin')) {
                return NgeniusUtility::initPayment();
            }
            
            return parent::render($request, $e);
        }
        else
        {
            return parent::render($request, $e);
        }
    }
}
