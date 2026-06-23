@props(['paginator'])

<div class="admin-list-footer">
    <p class="admin-list-footer__meta">
        @if ($paginator->total() > 0)
            Showing {{ $paginator->firstItem() }}–{{ $paginator->lastItem() }} of {{ $paginator->total() }}
        @else
            No records to display
        @endif
    </p>
    @if ($paginator->hasPages())
        <div class="pagination">{{ $paginator->links() }}</div>
    @endif
</div>
