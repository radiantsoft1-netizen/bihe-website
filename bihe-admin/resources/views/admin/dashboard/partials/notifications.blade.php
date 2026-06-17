<div class="dashboard-panel admin-card">
    <div class="dashboard-panel__head">
        <div class="dashboard-panel__icon dashboard-panel__icon--maroon">
            <x-dashboard-module-icon module="bell" />
        </div>
        <div>
            <h2>Notifications</h2>
            <p>Items that may need your attention</p>
        </div>
    </div>
    <ul class="notification-list notification-list--cards">
        @foreach ($notifications as $notification)
            <li class="notification-list__item notification-list__item--{{ $notification['type'] }}">
                <span class="notification-list__dot" aria-hidden="true"></span>
                <div class="notification-list__content">
                    @if ($notification['url'])
                        <a href="{{ $notification['url'] }}">{{ $notification['message'] }}</a>
                    @else
                        {{ $notification['message'] }}
                    @endif
                </div>
            </li>
        @endforeach
    </ul>
</div>
