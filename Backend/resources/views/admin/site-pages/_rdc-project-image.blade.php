@php
    $imageNumber = $imageIndex + 1;
    $imagePath = $image['path'] ?? '';
    $fileField = "projects[{$index}][images][{$imageIndex}][file]";
    $libraryField = "projects[{$index}][images][{$imageIndex}][file_library_path]";
@endphp

<section @class([
    'info-corner-form__section',
    'info-corner-form__section--media',
    'info-corner-form__section--images',
    'info-corner-form__detail-col' => $asColumn,
])>
    <label class="form-label" for="projects_{{ $index }}_image_{{ $imageIndex }}_file">
        Project Image {{ $imageNumber }} @if($imagePath !== '') (leave blank to keep current) @endif
    </label>

    @if ($imagePath !== '')
        <input type="hidden" name="projects[{{ $index }}][images][{{ $imageIndex }}][path]" value="{{ $imagePath }}">
    @else
        <p class="form-hint form-hint--tight">No uploaded image yet. The website will use its default image until you upload one here.</p>
    @endif

    @include('components.media-picker', [
        'id' => "projects_{$index}_image_{$imageIndex}_file",
        'name' => $fileField,
        'libraryName' => $libraryField,
        'type' => 'image',
        'currentPath' => $imagePath !== '' ? $imagePath : null,
    ])

    <label class="form-label" for="projects_{{ $index }}_image_{{ $imageIndex }}_alt">Image Alt Text</label>
    <input
        type="text"
        id="projects_{{ $index }}_image_{{ $imageIndex }}_alt"
        name="projects[{{ $index }}][images][{{ $imageIndex }}][alt]"
        class="form-input form-input--compact"
        value="{{ $image['alt'] }}"
    >
    @error("projects.$index.images.$imageIndex.alt")<p class="form-error">{{ $message }}</p>@enderror
</section>
