<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UniqueSlug
{
    /**
     * @param  class-string<Model>  $modelClass
     */
    public static function forModel(string $modelClass, ?string $slug, string $fallbackSource, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug ?: $fallbackSource);
        $candidate = $base;
        $suffix = 1;

        while (
            $modelClass::query()
                ->where('slug', $candidate)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $candidate = $base.'-'.$suffix;
            $suffix++;
        }

        return $candidate;
    }
}
