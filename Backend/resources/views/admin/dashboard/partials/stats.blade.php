<section class="dashboard-section">
    <div class="dashboard-section__head">
        <h2>Content Overview</h2>
        <p>Live counts across your accessible modules</p>
    </div>
    <div class="stats-grid stats-grid--dashboard">
        @foreach ($stats as $stat)
            @if ($stat['route'])
                <a href="{{ route($stat['route']) }}" class="stat-card stat-card--interactive stat-card--{{ $stat['accent'] }}">
            @else
                <div class="stat-card stat-card--{{ $stat['accent'] }}">
            @endif
                <div class="stat-card__icon-wrap">
                    <x-dashboard-module-icon :module="$stat['key']" class="stat-card__icon" />
                </div>
                <div class="stat-card__body">
                    <div class="stat-card__value">{{ $stat['total'] }}</div>
                    <div class="stat-card__label">{{ $stat['label'] }}</div>
                    @if (! is_null($stat['live']))
                        <div class="stat-card__meta">{{ $stat['live'] }} active / live</div>
                    @endif
                </div>
            @if ($stat['route'])
                </a>
            @else
                </div>
            @endif
        @endforeach
    </div>
</section>
