<?php

namespace App\Http\Controllers\Admin\Concerns;

use App\Http\Requests\Admin\BulkDestroyRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;

trait BulkDestroysRecords
{
    /**
     * @param  class-string<Model>  $modelClass
     * @param  callable(Model): void  $deleteUsing
     */
    protected function bulkDestroyRecords(
        BulkDestroyRequest $request,
        string $modelClass,
        string $redirectRouteName,
        callable $deleteUsing,
        ?callable $canDelete = null,
        array $redirectRouteParameters = [],
    ): RedirectResponse {
        $items = $modelClass::query()
            ->whereIn('id', $request->validated('ids'))
            ->get();

        $deleted = 0;
        $skipped = 0;

        foreach ($items as $item) {
            if ($canDelete !== null && ! $canDelete($item)) {
                $skipped++;
                continue;
            }

            $deleteUsing($item);
            $deleted++;
        }

        if ($deleted === 0 && $skipped > 0) {
            return redirect()
                ->route($redirectRouteName, $redirectRouteParameters)
                ->with('error', 'No selected items could be deleted.');
        }

        $message = $deleted === 1
            ? '1 item deleted successfully.'
            : $deleted.' items deleted successfully.';

        if ($skipped > 0) {
            $message .= ' '.$skipped.' item'.($skipped === 1 ? ' was' : 's were').' skipped.';
        }

        return redirect()
            ->route($redirectRouteName, $redirectRouteParameters)
            ->with('success', $message);
    }
}
