<aside class="admin-sidebar" id="admin-sidebar">
    <div class="admin-sidebar__brand">
        <a href="{{ route('admin.dashboard') }}" class="admin-sidebar__brand-link">
            <img
                src="{{ asset('images/logo.webp') }}"
                alt="Bapuji Institute of Hi-Tech Education"
                class="admin-sidebar__brand-logo"
                width="44"
                height="44"
            >
            <div class="admin-sidebar__brand-text">
                <h1>BIHE Admin</h1>
                <p>Content Management</p>
            </div>
        </a>
    </div>
    <div class="admin-sidebar__search">
        <label class="admin-sidebar__search-label" for="admin-nav-search">Search menu</label>
        <div class="admin-sidebar__search-field">
            <span class="admin-sidebar__search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                    <path d="M20 20L16.5 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </span>
            <input
                type="search"
                id="admin-nav-search"
                class="admin-sidebar__search-input"
                placeholder="Search menu..."
                autocomplete="off"
                spellcheck="false"
            >
        </div>
    </div>
    <nav class="admin-sidebar__nav" aria-label="Admin navigation">
        <ul class="admin-nav" id="admin-nav">
            @foreach (\App\Support\RoleAccess::navigationItems(auth()->user()) as $item)
                @php
                    $patterns = is_array($item['pattern']) ? $item['pattern'] : [$item['pattern']];
                    $children = $item['children'] ?? [];
                    $groupLabels = strtolower($item['label']);

                    foreach ($children as $child) {
                        $groupLabels .= ' '.strtolower($child['label']);
                    }
                @endphp

                @if ($children !== [])
                    @php
                        $isSettingsGroup = ($item['module'] ?? '') === 'settings';
                        $settingsChildActive = false;

                        if ($isSettingsGroup) {
                            foreach ($children as $child) {
                                $childPatterns = is_array($child['pattern']) ? $child['pattern'] : [$child['pattern']];

                                if (request()->routeIs(...$childPatterns)) {
                                    $settingsChildActive = true;
                                    break;
                                }
                            }
                        }
                    @endphp
                    <li class="admin-nav__group{{ $isSettingsGroup ? ' admin-nav__group--settings admin-nav__group--collapsible' : '' }}{{ $settingsChildActive ? ' is-open' : '' }}" data-nav-label="{{ $groupLabels }}">
                        @if ($isSettingsGroup)
                            <button
                                type="button"
                                class="admin-nav__group-toggle"
                                data-nav-group-toggle
                                aria-expanded="{{ $settingsChildActive ? 'true' : 'false' }}"
                            >
                                <span class="admin-nav__group-toggle-label">{{ $item['label'] }}</span>
                                <span class="admin-nav__group-chevron" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                        @else
                            <p class="admin-nav__group-label">{{ $item['label'] }}</p>
                        @endif
                        <ul class="admin-nav__submenu" data-nav-submenu>
                            @foreach ($children as $child)
                                @php
                                    $childPatterns = is_array($child['pattern']) ? $child['pattern'] : [$child['pattern']];
                                @endphp
                                <li data-nav-label="{{ strtolower($child['label']) }}">
                                    <a href="{{ route($child['route']) }}"
                                       class="{{ request()->routeIs(...$childPatterns) ? 'is-active' : '' }}">
                                        {{ $child['label'] }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </li>
                @else
                    <li data-nav-label="{{ strtolower($item['label']) }}">
                        <a href="{{ route($item['route']) }}"
                           class="{{ request()->routeIs(...$patterns) ? 'is-active' : '' }}">
                            {{ $item['label'] }}
                        </a>
                    </li>
                @endif
            @endforeach
        </ul>
        <p class="admin-nav__empty" id="admin-nav-empty" hidden>No matching menu items.</p>
    </nav>
</aside>
