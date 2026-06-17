<div class="dashboard-panel admin-card">
    <div class="dashboard-panel__head">
        <div class="dashboard-panel__icon dashboard-panel__icon--navy">
            <x-dashboard-module-icon module="plus" />
        </div>
        <div>
            <h2>Quick Actions</h2>
            <p>Jump straight into common tasks</p>
        </div>
    </div>
    <div class="quick-link-grid">
        @foreach ($quickLinks as $link)
            <a href="{{ route($link['route']) }}" class="quick-link-tile quick-link-tile--{{ $link['module'] }}">
                <span class="quick-link-tile__icon">
                    <x-dashboard-module-icon :module="$link['module']" />
                </span>
                <span class="quick-link-tile__label">{{ $link['label'] }}</span>
            </a>
        @endforeach
    </div>
</div>
