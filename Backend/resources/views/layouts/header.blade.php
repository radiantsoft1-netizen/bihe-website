<header class="admin-topbar">
    <div style="display:flex;align-items:center;gap:0.75rem;">
        <button type="button" class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle menu">☰</button>
        <h1 class="admin-topbar__title">@yield('page-title', 'Dashboard')</h1>
    </div>
    <div class="admin-topbar__actions">
        <a
            href="{{ config('website.nextjs_url') }}"
            class="btn btn-secondary btn-sm admin-topbar__web-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open public website in a new tab"
        >Web</a>
        <span class="admin-topbar__user">{{ auth()->user()->name }} <small>({{ auth()->user()->roleLabel() }})</small></span>
        <form method="POST" action="{{ route('admin.logout') }}">
            @csrf
            <button type="submit" class="btn btn-outline btn-sm">Logout</button>
        </form>
    </div>
</header>
