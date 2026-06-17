<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class AdminPagination
{
    /** @var list<int> */
    public const PER_PAGE_OPTIONS = [15, 20, 25, 50, 100];

    public static function selectedPerPage(Request $request, int $default = 20): string
    {
        $value = (string) $request->query('per_page', (string) $default);

        if ($value === 'all') {
            return 'all';
        }

        $perPage = (int) $value;

        if (in_array($perPage, self::PER_PAGE_OPTIONS, true)) {
            return (string) $perPage;
        }

        return (string) $default;
    }

    public static function perPageForRequest(Request $request, int $default = 20, ?int $total = null): int
    {
        if (self::selectedPerPage($request, $default) === 'all') {
            return max($total ?? 1, 1);
        }

        return (int) self::selectedPerPage($request, $default);
    }

    /**
     * @param  EloquentBuilder<\Illuminate\Database\Eloquent\Model>|QueryBuilder  $query
     */
    public static function paginate(EloquentBuilder|QueryBuilder $query, Request $request, int $default = 20): LengthAwarePaginator
    {
        $selected = self::selectedPerPage($request, $default);

        if ($selected === 'all') {
            $total = (clone $query)->count();

            return $query->paginate(max($total, 1))->withQueryString();
        }

        return $query->paginate((int) $selected)->withQueryString();
    }
}
