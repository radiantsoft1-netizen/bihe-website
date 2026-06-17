<div class="dashboard-panel dashboard-panel--activity admin-card">
    <div class="dashboard-panel__head">
        <div class="dashboard-panel__icon dashboard-panel__icon--slate">
            <x-dashboard-module-icon module="activity" />
        </div>
        <div>
            <h2>Recent Activity</h2>
            <p>Latest updates across the admin panel</p>
        </div>
    </div>
    <ul class="activity-feed">
        @forelse ($recentActivity as $item)
            <li class="activity-feed__item activity-feed__item--{{ $item['kind'] ?? 'default' }}">
                <div class="activity-feed__body">
                    <div class="activity-feed__row">
                        <p class="activity-feed__title">
                            @if ($item['url'])
                                <a href="{{ $item['url'] }}">{{ $item['title'] }}</a>
                            @else
                                {{ $item['title'] }}
                            @endif
                        </p>
                        <time class="activity-feed__time">{{ $item['at']?->format('M j, H:i') }}</time>
                    </div>
                    <p class="activity-feed__meta">{{ $item['meta'] }}</p>
                </div>
            </li>
        @empty
            <li class="activity-feed__item activity-feed__item--empty">No recent activity yet.</li>
        @endforelse
    </ul>
</div>
