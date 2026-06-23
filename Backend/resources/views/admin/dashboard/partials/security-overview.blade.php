<div class="dashboard-panel admin-card">
    <div class="dashboard-panel__head">
        <div class="dashboard-panel__icon dashboard-panel__icon--gold">
            <x-dashboard-module-icon module="security" />
        </div>
        <div>
            <h2>Security Overview</h2>
            <p>System health at a glance</p>
        </div>
    </div>
    <div class="kpi-row">
        <div class="kpi-card kpi-card--alert">
            <div class="kpi-card__value">{{ $securityStats['failed_logins'] }}</div>
            <div class="kpi-card__label">Failed Logins (24h)</div>
        </div>
        <div class="kpi-card kpi-card--navy">
            <div class="kpi-card__value">{{ $securityStats['active_sessions'] }}</div>
            <div class="kpi-card__label">Active Sessions</div>
        </div>
        <div class="kpi-card kpi-card--maroon">
            <div class="kpi-card__value">{{ $securityStats['total_users'] }}</div>
            <div class="kpi-card__label">Total Users</div>
        </div>
    </div>
</div>
