@once
    @php
        $ckeditorBasePath = rtrim(asset('assets/vendor/ckeditor4'), '/') . '/';
        $ckeditorScript = \App\Support\AdminAsset::url('assets/vendor/ckeditor4/ckeditor.js');
        $richTextScript = \App\Support\AdminAsset::url('assets/js/admin-rich-text.js');
    @endphp
    @push('scripts')
        <script>
            window.CKEDITOR_BASEPATH = @json($ckeditorBasePath);
            window.BIHE_RICH_TEXT = {
                uploadUrl: @json(route('admin.rich-text.upload-image')),
                basePath: @json($ckeditorBasePath),
            };
        </script>
        <script src="{{ $ckeditorScript }}"></script>
        <script>
            if (typeof CKEDITOR !== 'undefined') {
                CKEDITOR.basePath = window.CKEDITOR_BASEPATH;
                CKEDITOR.env.hc = false;
                CKEDITOR.env.cssClass = (CKEDITOR.env.cssClass || '').replace(/\s*cke_hc\b/g, '');
            }
        </script>
        <script src="{{ $richTextScript }}"></script>
    @endpush
@endonce
