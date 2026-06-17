<?php

namespace App\DataTransferObjects;

readonly class SecureUploadResult
{
    public function __construct(
        public string $path,
        public string $disk,
        public string $mime,
        public int $size,
        public string $sanitizedOriginalName,
    ) {
    }
}
