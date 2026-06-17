@once
    @push('head')
        <script>
            window.CKEDITOR_BASEPATH = @json(asset('assets/vendor/ckeditor4/'));
            window.BIHE_RICH_TEXT = {
                uploadUrl: @json(route('admin.rich-text.upload-image')),
            };
        </script>
        <script src="{{ \App\Support\AdminAsset::url('assets/vendor/ckeditor4/ckeditor.js') }}"></script>
        <script>
            // WebKit/Electron can falsely trigger CKEditor high-contrast mode (text labels instead of icons).
            if (typeof CKEDITOR !== 'undefined') {
                CKEDITOR.env.hc = false;
                CKEDITOR.env.cssClass = (CKEDITOR.env.cssClass || '').replace(/\s*cke_hc\b/g, '');
            }
        </script>
    @endpush
    @push('scripts')
        <script src="{{ \App\Support\AdminAsset::url('assets/js/admin-rich-text.js') }}" defer></script>
    @endpush
@endonce
