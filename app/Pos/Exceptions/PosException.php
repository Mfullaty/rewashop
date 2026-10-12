<?php

namespace App\Pos\Exceptions;

use RuntimeException;

class PosException extends RuntimeException
{
    public function __construct(public readonly string $errorCode, string $message, public readonly int $status = 422)
    {
        parent::__construct($message);
    }

    public function render($request)
    {
        return response()->json(['error' => ['code' => $this->errorCode, 'message' => $this->getMessage()]], $this->status);
    }
}
