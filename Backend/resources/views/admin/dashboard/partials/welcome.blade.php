<div class="dashboard-hero">
    <div class="dashboard-hero__glow" aria-hidden="true"></div>
    <div class="dashboard-hero__content">
        <p class="dashboard-hero__eyebrow">Good {{ $greeting }},</p>
        <h1 class="dashboard-hero__title">{{ auth()->user()->name }}</h1>
        <p class="dashboard-hero__text">
            @if ($role === \App\Enums\UserRole::SuperAdmin)
                Full system overview with security monitoring, user management, and all content modules.
            @elseif ($role === \App\Enums\UserRole::Admin)
                Manage all website content modules from one place.
            @else
                Upload and manage announcements, news, documents, and gallery content.
            @endif
        </p>
        <span class="dashboard-hero__badge">{{ $roleLabel }} Dashboard</span>
    </div>
    <div class="dashboard-hero__avatar" aria-hidden="true">{{ $userInitials }}</div>
</div>
