/**
 * BIHE Admin — media library picker (category browser for existing uploads)
 */
(function () {
  var modal = document.getElementById("admin-media-library");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function looksLikeUuidFilename(name) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\./i.test(name);
  }

  function stripUniqueIdSuffix(name) {
    return name.replace(/^(.+)-[a-f0-9]{8}(\.[^.]+)$/i, function (_, stem, extension) {
      return stem + extension;
    });
  }

  function formatDisplayName(name, type) {
    if (!name) {
      return type === "pdf" ? "PDF document" : "Selected image";
    }

    if (looksLikeUuidFilename(name)) {
      var extension = name.split(".").pop().toUpperCase();

      return type === "pdf" ? "PDF document" : "Uploaded image";
    }

    var displayName = stripUniqueIdSuffix(name);

    if (displayName.length <= 28) {
      return displayName;
    }

    return displayName.slice(0, 14) + "…" + displayName.slice(-10);
  }

  function fileDisplayName(file) {
    if (file.display_name) {
      return file.display_name;
    }

    return formatDisplayName(file.name, file.type);
  }

  function formatBytes(bytes) {
    if (!bytes) {
      return "0 B";
    }

    var units = ["B", "KB", "MB"];
    var size = bytes;
    var unit = 0;

    while (size >= 1024 && unit < units.length - 1) {
      size /= 1024;
      unit += 1;
    }

    return size.toFixed(size >= 10 || unit === 0 ? 0 : 1) + " " + units[unit];
  }

  function isPanelPicker(picker) {
    return picker.classList.contains("media-picker--panel") && !picker.classList.contains("media-picker--pdf");
  }

  function getPickerNodes(picker) {
    return {
      empty: picker.querySelector("[data-media-picker-empty]"),
      selected: picker.querySelector("[data-media-picker-selected]"),
      previewEmpty: picker.querySelector("[data-media-picker-preview-empty]"),
      count: picker.querySelector("[data-media-picker-count]"),
      thumb: picker.querySelector("[data-media-picker-thumb]"),
      filename: picker.querySelector("[data-media-picker-filename]"),
      libraryInput: picker.querySelector("[data-media-library-path]"),
      fileInput: picker.querySelector(".media-picker__file"),
      dropzone: picker.querySelector("[data-media-picker-dropzone]"),
    };
  }

  function showEmptyState(picker) {
    var nodes = getPickerNodes(picker);
    var panelLayout = isPanelPicker(picker);

    if (nodes.empty) {
      nodes.empty.hidden = false;
    }

    if (nodes.selected) {
      nodes.selected.hidden = true;
    }

    if (panelLayout && nodes.previewEmpty) {
      nodes.previewEmpty.hidden = false;
    }

    if (panelLayout && nodes.count) {
      nodes.count.textContent = "0";
    }
  }

  function showSelectedState(picker, payload) {
    var nodes = getPickerNodes(picker);
    var isPdf = payload.type === "pdf" || !payload.url;
    var panelLayout = isPanelPicker(picker);

    if (nodes.empty) {
      nodes.empty.hidden = panelLayout ? false : true;
    }

    if (nodes.selected) {
      nodes.selected.hidden = false;
    }

    if (panelLayout && nodes.previewEmpty) {
      nodes.previewEmpty.hidden = true;
    }

    if (panelLayout && nodes.count) {
      nodes.count.textContent = "1";
    }

    if (nodes.filename) {
      var fullName = payload.name || "";
      var mediaType = picker.getAttribute("data-media-type") || "image";

      nodes.filename.textContent = formatDisplayName(fullName, mediaType);
      nodes.filename.title = fullName || nodes.filename.textContent;
    }

    if (nodes.thumb) {
      if (isPdf) {
        nodes.thumb.innerHTML = '<span class="media-picker__thumb-pdf">PDF</span>';
      } else {
        nodes.thumb.innerHTML =
          '<img src="' +
          escapeHtml(payload.url) +
          '" alt="" class="media-picker__thumb-img">';
      }
    }
  }

  function clearPicker(picker) {
    var nodes = getPickerNodes(picker);

    if (nodes.libraryInput) {
      nodes.libraryInput.value = "";
    }

    if (nodes.fileInput) {
      nodes.fileInput.value = "";
    }

    showEmptyState(picker);
  }

  function applyFileToPicker(picker, payload) {
    showSelectedState(picker, payload);
  }

  function assignFileToInput(fileInput, file) {
    if (!fileInput || !file) {
      return;
    }

    try {
      var transfer = new DataTransfer();
      transfer.items.add(file);
      fileInput.files = transfer.files;
    } catch (error) {
      /* Preview still works; older browsers may not attach file to input. */
    }
  }

  function handleChosenFile(picker, file) {
    var nodes = getPickerNodes(picker);

    if (!file) {
      return;
    }

    assignFileToInput(nodes.fileInput, file);

    if (nodes.libraryInput) {
      nodes.libraryInput.value = "";
    }

    var previewUrl = file.type.indexOf("image/") === 0 ? URL.createObjectURL(file) : null;

    applyFileToPicker(picker, {
      type: file.type === "application/pdf" ? "pdf" : "image",
      url: previewUrl,
      name: file.name,
    });
  }

  function triggerLocalUpload(picker) {
    var nodes = picker.hasAttribute("data-media-picker-multiple")
      ? getMultiPickerNodes(picker)
      : getPickerNodes(picker);

    if (!nodes.fileInput) {
      return;
    }

    nodes.fileInput.click();
  }

  function shouldTriggerLocalUpload(event) {
    return !event.target.closest(
      "[data-media-picker-open], [data-media-picker-upload], [data-media-picker-clear], [data-media-picker-remove-item]",
    );
  }

  function bindDropzoneLocalUpload(picker, dropzone, isActive) {
    if (!dropzone) {
      return;
    }

    dropzone.addEventListener("click", function (event) {
      if (!shouldTriggerLocalUpload(event)) {
        return;
      }

      if (typeof isActive === "function" && !isActive()) {
        return;
      }

      triggerLocalUpload(picker);
    });

    dropzone.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      if (typeof isActive === "function" && !isActive()) {
        return;
      }

      event.preventDefault();
      triggerLocalUpload(picker);
    });
  }

  function bindPicker(picker) {
    if (picker.hasAttribute("data-media-picker-multiple")) {
      bindMultiPicker(picker);
      return;
    }

    var nodes = getPickerNodes(picker);

    picker.querySelectorAll("[data-media-picker-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (modal) {
          openModal(picker);
        }
      });
    });

    picker.querySelectorAll("[data-media-picker-upload]").forEach(function (button) {
      button.addEventListener("click", function () {
        triggerLocalUpload(picker);
      });
    });

    var clearButton = picker.querySelector("[data-media-picker-clear]");
    if (clearButton) {
      clearButton.addEventListener("click", function () {
        clearPicker(picker);
      });
    }

    if (nodes.dropzone) {
      nodes.dropzone.addEventListener("dragover", function (event) {
        event.preventDefault();
        nodes.dropzone.classList.add("is-dragover");
      });

      nodes.dropzone.addEventListener("dragleave", function () {
        nodes.dropzone.classList.remove("is-dragover");
      });

      nodes.dropzone.addEventListener("drop", function (event) {
        event.preventDefault();
        nodes.dropzone.classList.remove("is-dragover");

        if (!event.dataTransfer || !event.dataTransfer.files.length) {
          return;
        }

        handleChosenFile(picker, event.dataTransfer.files[0]);
      });

      bindDropzoneLocalUpload(picker, nodes.dropzone, function () {
        return nodes.empty && !nodes.empty.hidden;
      });

      if (nodes.empty) {
        nodes.empty.setAttribute("role", "button");
        nodes.empty.setAttribute("tabindex", "0");
        nodes.empty.setAttribute("aria-label", "Choose file from your computer");
      }
    }

    if (nodes.fileInput) {
      nodes.fileInput.addEventListener("change", function () {
        if (!nodes.fileInput.files || !nodes.fileInput.files.length) {
          return;
        }

        handleChosenFile(picker, nodes.fileInput.files[0]);
      });
    }
  }

  function getMultiPickerNodes(picker) {
    return {
      gallery: picker.querySelector("[data-media-picker-gallery]"),
      galleryEmpty: picker.querySelector("[data-media-picker-gallery-empty]"),
      galleryCount: picker.querySelector("[data-media-picker-count]"),
      empty: picker.querySelector("[data-media-picker-empty]"),
      emptyTitle: picker.querySelector("[data-media-picker-empty-title]"),
      fileInput: picker.querySelector(".media-picker__file"),
      dropzone: picker.querySelector("[data-media-picker-dropzone]"),
      libraryMount: picker.querySelector("[data-media-picker-library-mount]"),
    };
  }

  function updateMultiPickerEmptyState(picker) {
    var nodes = getMultiPickerNodes(picker);
    var count = countMultiPickerItems(picker);
    var hasItems = count > 0;

    if (nodes.gallery) {
      nodes.gallery.hidden = !hasItems;
    }

    if (nodes.galleryEmpty) {
      nodes.galleryEmpty.hidden = hasItems;
    }

    if (nodes.galleryCount) {
      nodes.galleryCount.textContent = String(count);
    }

    if (nodes.emptyTitle) {
      nodes.emptyTitle.textContent = hasItems
        ? "Add more images from your computer"
        : "Choose images from your computer";
    }
  }

  function createMultiPickerItem(picker, payload) {
    var nodes = getMultiPickerNodes(picker);
    var libraryField = picker.getAttribute("data-library-field") || "image_library_paths";

    if (!nodes.gallery) {
      return null;
    }

    var item = document.createElement("div");
    item.className = "media-picker__multi-item";
    item.setAttribute("data-media-picker-item", "");

    if (payload.existingId) {
      item.setAttribute("data-existing-id", String(payload.existingId));
    }

    if (payload.fileKey) {
      item.setAttribute("data-file-key", payload.fileKey);
    }

    if (payload.libraryPath) {
      item.setAttribute("data-library-path", payload.libraryPath);
    }

    var image = document.createElement("img");
    image.className = "media-picker__multi-img";
    image.alt = "";
    image.src = payload.url || "";
    item.appendChild(image);

    var removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "media-picker__multi-remove";
    removeButton.setAttribute("data-media-picker-remove-item", "");
    removeButton.setAttribute("aria-label", "Remove image");
    removeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
    item.appendChild(removeButton);

    if (payload.existingId) {
      var keepInput = document.createElement("input");
      keepInput.type = "hidden";
      keepInput.name = "keep_image_ids[]";
      keepInput.value = String(payload.existingId);
      item.appendChild(keepInput);
    }

    if (payload.libraryPath) {
      var libraryInput = document.createElement("input");
      libraryInput.type = "hidden";
      libraryInput.name = libraryField + "[]";
      libraryInput.value = payload.libraryPath;
      item.appendChild(libraryInput);
    }

    nodes.gallery.appendChild(item);
    updateMultiPickerEmptyState(picker);

    return item;
  }

  function syncMultiPickerFiles(picker) {
    var nodes = getMultiPickerNodes(picker);

    if (!nodes.fileInput || typeof DataTransfer === "undefined") {
      return;
    }

    var transfer = new DataTransfer();

    picker.querySelectorAll("[data-media-picker-item][data-file-key]").forEach(function (item) {
      var file = item._mediaPickerFile;

      if (file) {
        transfer.items.add(file);
      }
    });

    nodes.fileInput.files = transfer.files;
  }

  function removeMultiPickerItem(picker, item) {
    if (!item) {
      return;
    }

    item.remove();
    syncMultiPickerFiles(picker);
    updateMultiPickerCount(picker);
  }

  function addFilesToMultiPicker(picker, fileList) {
    if (!fileList || !fileList.length) {
      return;
    }

    var addedCount = 0;

    Array.prototype.forEach.call(fileList, function (file, index) {
      if (!file || file.type.indexOf("image/") !== 0) {
        return;
      }

      if (pickerHasLocalFile(picker, file)) {
        return;
      }

      var fileKey =
        "file-" + Date.now() + "-" + index + "-" + Math.random().toString(36).slice(2);
      var item = createMultiPickerItem(picker, {
        url: URL.createObjectURL(file),
        fileKey: fileKey,
        name: file.name,
      });

      if (item) {
        item._mediaPickerFile = file;
        addedCount += 1;
      }
    });

    if (addedCount > 0) {
      syncMultiPickerFiles(picker);
      updateMultiPickerCount(picker);
    }
  }

  function fileSignature(file) {
    return [file.name, file.size, file.lastModified].join(":");
  }

  function pickerHasLocalFile(picker, file) {
    var signature = fileSignature(file);
    var duplicate = false;

    picker.querySelectorAll("[data-media-picker-item][data-file-key]").forEach(function (item) {
      if (item._mediaPickerFile && fileSignature(item._mediaPickerFile) === signature) {
        duplicate = true;
      }
    });

    return duplicate;
  }

  function pickerHasLibraryPath(picker, libraryPath) {
    var found = false;

    picker.querySelectorAll("[data-media-picker-item][data-library-path]").forEach(function (item) {
      if (item.getAttribute("data-library-path") === libraryPath) {
        found = true;
      }
    });

    return found;
  }

  function countMultiPickerItems(picker) {
    return picker.querySelectorAll("[data-media-picker-item]").length;
  }

  function updateMultiPickerCount(picker) {
    var nodes = getMultiPickerNodes(picker);
    var count = countMultiPickerItems(picker);
    var supports = picker.querySelector(".media-picker__supports");

    if (supports) {
      supports.textContent =
        count > 0
          ? count + " image" + (count === 1 ? "" : "s") + " ready to upload. Add more anytime."
          : supports.getAttribute("data-default-hint") || supports.textContent;
    }

    if (nodes.emptyTitle) {
      nodes.emptyTitle.textContent =
        count > 0
          ? "Add more images from your computer"
          : "Choose images from your computer";
    }

    updateMultiPickerEmptyState(picker);
  }

  function bindMultiPickerFormSubmit() {
    document.querySelectorAll("form").forEach(function (form) {
      if (form.dataset.multiPickerSubmitBound === "1") {
        return;
      }

      form.dataset.multiPickerSubmitBound = "1";
      form.addEventListener("submit", function () {
        document.querySelectorAll("[data-media-picker-multiple]").forEach(function (picker) {
          syncMultiPickerFiles(picker);
        });
      });
    });
  }

  function bindMultiPicker(picker) {
    var nodes = getMultiPickerNodes(picker);

    picker.querySelectorAll("[data-media-picker-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (modal) {
          openModal(picker);
        }
      });
    });

    picker.querySelectorAll("[data-media-picker-upload]").forEach(function (button) {
      button.addEventListener("click", function () {
        triggerLocalUpload(picker);
      });
    });

    picker.addEventListener("click", function (event) {
      var removeButton = event.target.closest("[data-media-picker-remove-item]");

      if (!removeButton) {
        return;
      }

      var item = removeButton.closest("[data-media-picker-item]");
      removeMultiPickerItem(picker, item);
    });

    if (nodes.dropzone) {
      nodes.dropzone.addEventListener("dragover", function (event) {
        event.preventDefault();
        nodes.dropzone.classList.add("is-dragover");
      });

      nodes.dropzone.addEventListener("dragleave", function () {
        nodes.dropzone.classList.remove("is-dragover");
      });

      nodes.dropzone.addEventListener("drop", function (event) {
        event.preventDefault();
        nodes.dropzone.classList.remove("is-dragover");

        if (!event.dataTransfer || !event.dataTransfer.files.length) {
          return;
        }

        addFilesToMultiPicker(picker, event.dataTransfer.files);
      });

      bindDropzoneLocalUpload(picker, nodes.dropzone);

      if (nodes.empty) {
        nodes.empty.setAttribute("role", "button");
        nodes.empty.setAttribute("tabindex", "0");
        nodes.empty.setAttribute("aria-label", "Choose files from your computer");
      }
    }

    if (nodes.fileInput) {
      nodes.fileInput.setAttribute("multiple", "multiple");
      nodes.fileInput.addEventListener("change", function () {
        if (!nodes.fileInput.files || !nodes.fileInput.files.length) {
          return;
        }

        addFilesToMultiPicker(picker, nodes.fileInput.files);
        nodes.fileInput.value = "";
      });
    }

    picker.querySelectorAll(".media-picker__supports").forEach(function (node) {
      if (!node.getAttribute("data-default-hint")) {
        node.setAttribute("data-default-hint", node.textContent || "");
      }
    });

    updateMultiPickerCount(picker);
  }

  document.querySelectorAll("[data-media-picker]").forEach(bindPicker);
  bindMultiPickerFormSubmit();

  if (!modal) {
    return;
  }

  var categoriesList = modal.querySelector("[data-media-library-categories]");
  var grid = modal.querySelector("[data-media-library-grid]");
  var emptyState = modal.querySelector("[data-media-library-empty]");
  var currentCategoryLabel = modal.querySelector("[data-media-library-current-category]");
  var selectionLabel = modal.querySelector("[data-media-library-selection]");
  var selectButton = modal.querySelector("[data-media-library-select]");
  var uploadButton = modal.querySelector("[data-media-library-upload]");
  var deleteButton = modal.querySelector("[data-media-library-delete]");
  var deleteButtonLabel = deleteButton
    ? deleteButton.querySelector("[data-media-library-delete-label]")
    : null;
  var searchInput = modal.querySelector("[data-media-library-search]");

  var csrf =
    document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

  var activePicker = null;
  var activeType = "image";
  var categories = [];
  var activeCategory = null;
  var currentCategoryFiles = [];
  var searchQuery = "";
  var selectedFile = null;
  var selectedFiles = [];

  function isMultiPickerMode() {
    return activePicker && activePicker.hasAttribute("data-media-picker-multiple");
  }

  function updateSelectButtonLabel() {
    if (!selectButton) {
      updateDeleteButtonLabel();
      return;
    }

    if (isMultiPickerMode()) {
      if (selectedFiles.length === 0) {
        selectButton.textContent = "Add selected images";
        selectButton.disabled = true;
      } else {
        selectButton.textContent =
          "Add " +
          selectedFiles.length +
          " image" +
          (selectedFiles.length === 1 ? "" : "s");
        selectButton.disabled = false;
      }

      updateDeleteButtonLabel();
      return;
    }

    selectButton.textContent = "Use selected file";
    selectButton.disabled = !selectedFile;
    updateDeleteButtonLabel();
  }

  function selectedCount() {
    return isMultiPickerMode() ? selectedFiles.length : selectedFile ? 1 : 0;
  }

  function getSelectedPaths() {
    if (isMultiPickerMode()) {
      return selectedFiles.map(function (file) {
        return file.path;
      });
    }

    return selectedFile ? [selectedFile.path] : [];
  }

  function updateDeleteButtonLabel() {
    if (!deleteButton) {
      return;
    }

    var count = selectedCount();

    deleteButton.disabled = count === 0 || !activeCategory;

    if (deleteButtonLabel) {
      deleteButtonLabel.textContent =
        count > 1 ? "Delete " + count + " selected" : "Delete selected";
    }
  }

  function updateCategoryCount(categoryKey, count) {
    categories.forEach(function (category) {
      if (category.key === categoryKey) {
        category.count = count;
      }
    });
    renderCategories();
  }

  function fetchJson(url) {
    return fetch(url, {
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("request_failed");
      }

      return response.json();
    });
  }

  function setSelection(file) {
    selectedFile = file || null;
    selectedFiles = [];

    if (!file) {
      selectionLabel.textContent = "No file selected";
      updateSelectButtonLabel();
      return;
    }

    selectionLabel.textContent =
      fileDisplayName(file) + " (" + formatBytes(file.size) + ")";
    updateSelectButtonLabel();
  }

  function setMultiSelection(files) {
    selectedFile = null;
    selectedFiles = files.slice();

    if (selectedFiles.length === 0) {
      selectionLabel.textContent = "No files selected";
    } else if (selectedFiles.length === 1) {
      selectionLabel.textContent =
        selectedFiles[0].name + " (" + formatBytes(selectedFiles[0].size) + ")";
    } else {
      selectionLabel.textContent = selectedFiles.length + " files selected";
    }

    updateSelectButtonLabel();
  }

  function toggleMultiLibrarySelection(file, button) {
    var existingIndex = -1;

    selectedFiles.forEach(function (item, index) {
      if (item.path === file.path) {
        existingIndex = index;
      }
    });

    if (existingIndex === -1) {
      selectedFiles.push(file);
      button.classList.add("is-selected");
    } else {
      selectedFiles.splice(existingIndex, 1);
      button.classList.remove("is-selected");
    }

    setMultiSelection(selectedFiles);
  }

  function getFilteredFiles() {
    var query = searchQuery.trim().toLowerCase();

    if (!query) {
      return currentCategoryFiles;
    }

    return currentCategoryFiles.filter(function (file) {
      return (file.name || "").toLowerCase().indexOf(query) !== -1;
    });
  }

  function updateEmptyState(files) {
    if (files.length > 0) {
      emptyState.hidden = true;
      return;
    }

    emptyState.hidden = false;

    if (currentCategoryFiles.length > 0 && searchQuery.trim()) {
      emptyState.textContent = "No files match your search.";
      return;
    }

    emptyState.textContent = "No files in this category yet.";
  }

  function renderCurrentFiles() {
    renderFiles(getFilteredFiles());
  }

  function renderCategories() {
    categoriesList.innerHTML = "";

    categories.forEach(function (category) {
      var item = document.createElement("li");
      var button = document.createElement("button");
      button.type = "button";
      button.className =
        "admin-media-library__category-btn" +
        (category.key === activeCategory ? " is-active" : "");
      button.setAttribute("data-category", category.key);
      button.innerHTML =
        escapeHtml(category.label) +
        '<span class="admin-media-library__category-count">' +
        category.count +
        " file" +
        (category.count === 1 ? "" : "s") +
        "</span>";

      button.addEventListener("click", function () {
        loadCategory(category.key, category.label);
      });

      item.appendChild(button);
      categoriesList.appendChild(item);
    });
  }

  function renderFiles(files) {
    grid.innerHTML = "";
    updateEmptyState(files);

    files.forEach(function (file) {
      var button = document.createElement("button");
      button.type = "button";
      var isSelected = isMultiPickerMode()
        ? selectedFiles.some(function (item) {
            return item.path === file.path;
          })
        : selectedFile && selectedFile.path === file.path;
      button.className =
        "admin-media-library__item" + (isSelected ? " is-selected" : "");
      button.setAttribute("data-file-path", file.path);

      if (file.type === "pdf" || !file.url) {
        button.innerHTML =
          '<span class="admin-media-library__pdf-icon">PDF</span>' +
          '<span class="admin-media-library__name" title="' +
          escapeHtml(file.name) +
          '">' +
          escapeHtml(fileDisplayName(file)) +
          "</span>";
      } else {
        button.innerHTML =
          '<img src="' +
          escapeHtml(file.url) +
          '" alt="" class="admin-media-library__thumb">' +
          '<span class="admin-media-library__name" title="' +
          escapeHtml(file.name) +
          '">' +
          escapeHtml(fileDisplayName(file)) +
          "</span>";
      }

      button.addEventListener("click", function () {
        if (isMultiPickerMode()) {
          toggleMultiLibrarySelection(file, button);
          return;
        }

        grid.querySelectorAll(".admin-media-library__item.is-selected").forEach(function (node) {
          node.classList.remove("is-selected");
        });
        button.classList.add("is-selected");
        setSelection(file);
      });

      grid.appendChild(button);
    });
  }

  function loadCategory(key, label) {
    activeCategory = key;
    currentCategoryLabel.textContent = label || "Files";

    if (isMultiPickerMode()) {
      setMultiSelection([]);
    } else {
      setSelection(null);
    }

    renderCategories();

    fetchJson("/admin/media-library/files?category=" + encodeURIComponent(key))
      .then(function (payload) {
        currentCategoryFiles = payload.data || [];
        renderCurrentFiles();
      })
      .catch(function () {
        currentCategoryFiles = [];
        renderCurrentFiles();
      });
  }

  function openModal(picker) {
    activePicker = picker;
    activeType = picker.getAttribute("data-media-type") || "image";
    activeCategory = null;
    currentCategoryFiles = [];
    searchQuery = "";

    if (searchInput) {
      searchInput.value = "";
    }

    if (picker.hasAttribute("data-media-picker-multiple")) {
      setMultiSelection([]);
      if (selectionLabel) {
        selectionLabel.textContent = "Select one or more images (click to toggle)";
      }
    } else {
      setSelection(null);
    }

    updateSelectButtonLabel();
    grid.innerHTML = "";
    emptyState.hidden = true;
    currentCategoryLabel.textContent = "Loading categories...";

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    fetchJson("/admin/media-library/categories?type=" + encodeURIComponent(activeType))
      .then(function (payload) {
        categories = payload.data || [];
        renderCategories();

        if (categories.length === 0) {
          currentCategoryLabel.textContent = "No categories available";
          emptyState.hidden = false;
          return;
        }

        var first = categories[0];
        loadCategory(first.key, first.label);
      })
      .catch(function () {
        currentCategoryLabel.textContent = "Could not load media library";
        emptyState.hidden = false;
      });
  }

  function closeModal() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activePicker = null;
    selectedFile = null;
    selectedFiles = [];
    updateSelectButtonLabel();
  }

  function applySelection() {
    if (!activePicker) {
      return;
    }

    if (activePicker.hasAttribute("data-media-picker-multiple")) {
      if (!selectedFiles.length) {
        return;
      }

      selectedFiles.forEach(function (file) {
        if (pickerHasLibraryPath(activePicker, file.path)) {
          return;
        }

        createMultiPickerItem(activePicker, {
          type: file.type,
          url: file.url,
          name: file.name,
          libraryPath: file.path,
        });
      });

      updateMultiPickerCount(activePicker);
      closeModal();
      return;
    }

    if (!selectedFile) {
      return;
    }

    var nodes = getPickerNodes(activePicker);

    if (nodes.libraryInput) {
      nodes.libraryInput.value = selectedFile.path;
    }

    if (nodes.fileInput) {
      nodes.fileInput.value = "";
      nodes.fileInput.removeAttribute("required");
    }

    applyFileToPicker(activePicker, {
      type: selectedFile.type,
      url: selectedFile.url,
      name: selectedFile.name,
    });

    closeModal();
  }

  function deleteSelectedFiles() {
    var paths = getSelectedPaths();

    if (!activeCategory || !paths.length) {
      return;
    }

    var count = paths.length;
    var categoryLabel = currentCategoryLabel.textContent || "this category";
    var message =
      "Are you sure you want to delete " +
      count +
      " file" +
      (count === 1 ? "" : "s") +
      ' from "' +
      categoryLabel +
      '"? This action cannot be undone.';

    if (!window.confirm(message)) {
      return;
    }

    deleteButton.disabled = true;

    fetch("/admin/media-library/files", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": csrf,
      },
      body: JSON.stringify({
        category: activeCategory,
        paths: paths,
      }),
    })
      .then(function (response) {
        return response.json().then(function (payload) {
          if (!response.ok) {
            var errorMessage =
              payload?.message ||
              payload?.errors?.paths?.[0] ||
              payload?.errors?.category?.[0] ||
              "Could not delete selected files.";

            throw new Error(errorMessage);
          }

          return payload;
        });
      })
      .then(function (payload) {
        if (payload.category) {
          updateCategoryCount(payload.category.key, payload.category.count);
        }

        if (isMultiPickerMode()) {
          setMultiSelection([]);
        } else {
          setSelection(null);
        }

        loadCategory(activeCategory, categoryLabel);
      })
      .catch(function (error) {
        window.alert(error.message || "Could not delete selected files.");
        updateDeleteButtonLabel();
      });
  }

  modal.querySelectorAll("[data-media-library-close]").forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  if (selectButton) {
    selectButton.addEventListener("click", applySelection);
  }

  if (uploadButton) {
    uploadButton.addEventListener("click", function () {
      if (activePicker) {
        var picker = activePicker;
        closeModal();
        triggerLocalUpload(picker);
      }
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", deleteSelectedFiles);
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchQuery = searchInput.value;
      renderCurrentFiles();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
})();
