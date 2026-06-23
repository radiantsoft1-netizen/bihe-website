/**
 * BIHE Admin — full-page media library browser (matches form media-picker design).
 */
(function () {
  var root = document.querySelector("[data-media-library-page]");

  if (!root) {
    return;
  }

  function readJsonDataset(name, fallback) {
    var raw = root.getAttribute(name);

    if (!raw) {
      return fallback;
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function pageConfig() {
    var globalConfig = window.BIHE_MEDIA_LIBRARY_PAGE || {};

    return {
      uploadUrl: root.getAttribute("data-upload-url") || globalConfig.uploadUrl || "",
      filesUrl: root.getAttribute("data-files-url") || globalConfig.filesUrl || "",
      imageMaxKb: Number(
        root.getAttribute("data-image-max-kb") || globalConfig.imageMaxKb || 5120,
      ),
      pdfMaxKb: Number(root.getAttribute("data-pdf-max-kb") || globalConfig.pdfMaxKb || 10240),
      imageCategories:
        readJsonDataset("data-image-categories", globalConfig.imageCategories) || [],
      pdfCategories: readJsonDataset("data-pdf-categories", globalConfig.pdfCategories) || [],
    };
  }

  var csrf =
    document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

  var typeTabs = root.querySelectorAll("[data-media-type-tab]");
  var categoriesList = root.querySelector("[data-media-library-page-categories]");
  var gallery = root.querySelector("[data-media-library-page-gallery]");
  var dropzone = root.querySelector("[data-media-library-page-dropzone]");
  var emptyState = root.querySelector("[data-media-library-page-empty]");
  var dropTitle = root.querySelector("[data-media-library-page-drop-title]");
  var dropHint = root.querySelector("[data-media-library-page-drop-hint]");
  var supports = root.querySelector("[data-media-library-page-supports]");
  var statusEl = root.querySelector("[data-media-library-page-status]");
  var iconWrap = root.querySelector("[data-media-library-page-icon]");
  var fileInput = root.querySelector("[data-media-library-page-file-input]");
  var browseTitle = root.querySelector("[data-media-library-page-browse-title]");
  var browseEmpty = root.querySelector("[data-media-library-page-browse-empty]");
  var uploadHeading = root.querySelector("[data-media-library-page-upload-heading]");

  var activeType = "image";
  var activeCategory = null;
  var activeCategoryLabel = "";
  var isUploading = false;
  var imageCategoryList = [];
  var pdfCategoryList = [];

  function config() {
    return pageConfig();
  }

  function uploadUrl() {
    return config().uploadUrl;
  }

  function filesUrl() {
    return config().filesUrl;
  }

  function imageCategories() {
    return imageCategoryList;
  }

  function pdfCategories() {
    return pdfCategoryList;
  }

  function syncCategoryLists() {
    var page = pageConfig();
    imageCategoryList = (page.imageCategories || []).map(function (entry) {
      return Object.assign({}, entry);
    });
    pdfCategoryList = (page.pdfCategories || []).map(function (entry) {
      return Object.assign({}, entry);
    });
  }

  var imageIcon =
    '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="6" y="10" width="36" height="28" rx="4" fill="currentColor" opacity="0.18"/>' +
    '<path d="M6 32l10-9 8 7 7-6 11 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="34" cy="18" r="3.5" fill="currentColor"/></svg>';

  var pdfIcon =
    '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="8" y="6" width="32" height="36" rx="4" fill="currentColor" opacity="0.18"/>' +
    '<path d="M16 18h16M16 24h16M16 30h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

  function stripUniqueIdSuffix(name) {
    return name.replace(/^(.+)-[a-f0-9]{8}(\.[^.]+)$/i, function (_, stem, extension) {
      return stem + extension;
    });
  }

  function formatDisplayName(name, type) {
    if (!name) {
      return type === "pdf" ? "PDF document" : "Image";
    }

    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\./i.test(name)) {
      return type === "pdf" ? "PDF document" : "Uploaded image";
    }

    var displayName = stripUniqueIdSuffix(name);

    if (displayName.length <= 28) {
      return displayName;
    }

    return displayName.slice(0, 14) + "…" + displayName.slice(-10);
  }

  function setStatus(message, isError) {
    if (!statusEl) {
      return;
    }

    if (!message) {
      statusEl.hidden = true;
      statusEl.textContent = "";
      statusEl.classList.remove("is-error");
      return;
    }

    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.classList.toggle("is-error", !!isError);
  }

  function currentCategories() {
    return activeType === "pdf" ? pdfCategories() : imageCategories();
  }

  function updateDropzoneCopy() {
    if (!activeCategory) {
      dropTitle.textContent = "Select a category to browse files";
      dropHint.hidden = true;
      supports.textContent = "";
      uploadHeading.textContent = "Upload your files:";
      if (iconWrap) {
        iconWrap.innerHTML = activeType === "pdf" ? pdfIcon : imageIcon;
      }
      fileInput.accept = activeType === "pdf" ? "application/pdf" : "image/jpeg,image/png,image/gif,image/webp";
      fileInput.multiple = activeType !== "pdf";
      return;
    }

    uploadHeading.textContent =
      activeType === "pdf" ? "Upload your file:" : "Upload your files:";
    dropTitle.textContent =
      activeType === "pdf"
        ? "Choose a PDF from your computer"
        : "Add more images from your computer";
    dropHint.hidden = false;

    if (iconWrap) {
      iconWrap.innerHTML = activeType === "pdf" ? pdfIcon : imageIcon;
    }

    supports.textContent =
      activeType === "pdf"
        ? "PDF only — max " + config().pdfMaxKb + " KB."
        : "JPEG, PNG, GIF, or WebP — max " +
          config().imageMaxKb +
          " KB each. Hold Shift or Cmd/Ctrl to select multiple files at once.";

    fileInput.accept = activeType === "pdf" ? "application/pdf" : "image/jpeg,image/png,image/gif,image/webp";
    fileInput.multiple = activeType !== "pdf";
  }

  function renderCategories() {
    categoriesList.innerHTML = "";
    var list = currentCategories();

    list.forEach(function (category) {
      var item = document.createElement("li");
      var button = document.createElement("button");
      button.type = "button";
      button.className =
        "media-library-page__category-btn" +
        (category.key === activeCategory ? " is-active" : "");
      button.innerHTML =
        escapeHtml(category.label) +
        '<span class="media-library-page__category-count">' +
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

  function renderGallery(files) {
    gallery.innerHTML = "";

    if (!activeCategory) {
      gallery.hidden = true;
      if (browseEmpty) {
        browseEmpty.hidden = true;
      }
      if (browseTitle) {
        browseTitle.textContent = "Select a category to browse files";
      }
      return;
    }

    if (browseTitle) {
      browseTitle.textContent =
        activeCategoryLabel +
        " · " +
        files.length +
        " file" +
        (files.length === 1 ? "" : "s");
    }

    if (!files.length) {
      gallery.hidden = true;
      if (browseEmpty) {
        browseEmpty.hidden = false;
      }
      return;
    }

    gallery.hidden = false;
    if (browseEmpty) {
      browseEmpty.hidden = true;
    }

    files.forEach(function (file) {
      var item = document.createElement("div");
      var isPdf = file.type === "pdf" || !file.url;
      item.className =
        "media-library-page__file-item" + (isPdf ? " media-library-page__file-item--pdf" : "");

      if (isPdf) {
        item.innerHTML =
          '<div class="media-library-page__pdf-tile"><span class="media-picker__thumb-pdf">PDF</span></div>' +
          '<p class="media-library-page__file-name" title="' +
          escapeHtml(file.name) +
          '">' +
          escapeHtml(file.display_name || formatDisplayName(file.name, "pdf")) +
          "</p>" +
          '<p class="media-library-page__file-meta">' +
          escapeHtml(formatBytes(file.size)) +
          "</p>" +
          '<div class="media-library-page__file-actions">' +
          (file.url
            ? '<a class="media-library-page__file-link" href="' +
              escapeHtml(file.url) +
              '" target="_blank" rel="noopener">Open</a>'
            : "") +
          '<button type="button" class="media-library-page__file-link" data-copy-path="' +
          escapeHtml(file.path) +
          '">Copy path</button>' +
          "</div>";
      } else {
        item.innerHTML =
          '<img src="' +
          escapeHtml(file.url) +
          '" alt="" class="media-library-page__thumb">' +
          '<p class="media-library-page__file-name media-library-page__file-name--overlay" title="' +
          escapeHtml(file.name) +
          '">' +
          escapeHtml(file.display_name || formatDisplayName(file.name, "image")) +
          "</p>" +
          '<div class="media-library-page__file-actions media-library-page__file-actions--overlay">' +
          '<a class="media-library-page__file-link" href="' +
          escapeHtml(file.url) +
          '" target="_blank" rel="noopener">Open</a>' +
          '<button type="button" class="media-library-page__file-link" data-copy-path="' +
          escapeHtml(file.path) +
          '">Copy path</button>' +
          "</div>";
      }

      gallery.appendChild(item);
    });

    gallery.querySelectorAll("[data-copy-path]").forEach(function (button) {
      button.addEventListener("click", function () {
        var path = button.getAttribute("data-copy-path") || "";

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(path).then(function () {
            setStatus("Copied path to clipboard.");
          });
        } else {
          setStatus("Path: " + path);
        }
      });
    });
  }

  function loadCategory(key, label) {
    activeCategory = key;
    activeCategoryLabel = label || "";
    setStatus("");
    updateDropzoneCopy();
    renderCategories();

    fetch(filesUrl() + "?category=" + encodeURIComponent(key), {
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("request_failed");
        }

        return response.json();
      })
      .then(function (payload) {
        renderGallery(payload.data || []);
      })
      .catch(function () {
        renderGallery([]);
        setStatus("Could not load files for " + label + ".", true);
      });
  }

  function uploadFiles(fileList) {
    if (!activeCategory || !fileList || !fileList.length || isUploading) {
      return;
    }

    var formData = new FormData();
    formData.append("category", activeCategory);

    Array.prototype.forEach.call(fileList, function (file) {
      formData.append("files[]", file);
    });

    isUploading = true;
    setStatus("Uploading…");

    fetch(uploadUrl(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": csrf,
      },
      body: formData,
    })
      .then(function (response) {
        return response.json().then(function (payload) {
          if (!response.ok) {
            var message =
              payload?.message ||
              payload?.errors?.files?.[0] ||
              payload?.errors?.category?.[0] ||
              "Upload failed.";

            throw new Error(message);
          }

          return payload;
        });
      })
      .then(function (payload) {
        var uploaded = payload.data || [];
        var category = payload.category;

        if (category) {
          var list = currentCategories();
          list.forEach(function (entry) {
            if (entry.key === category.key) {
              entry.count = category.count;
            }
          });
        }

        setStatus(
          uploaded.length +
            " file" +
            (uploaded.length === 1 ? "" : "s") +
            " uploaded successfully.",
        );

        if (activeCategory) {
          var activeLabel = "";
          currentCategories().forEach(function (entry) {
            if (entry.key === activeCategory) {
              activeLabel = entry.label;
            }
          });
          loadCategory(activeCategory, activeLabel);
        }
      })
      .catch(function (error) {
        setStatus(error.message || "Upload failed.", true);
      })
      .finally(function () {
        isUploading = false;
        if (fileInput) {
          fileInput.value = "";
        }
      });
  }

  function triggerUpload() {
    if (!activeCategory) {
      setStatus("Select a category before uploading.", true);
      return;
    }

    fileInput.click();
  }

  typeTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var type = tab.getAttribute("data-media-type-tab") || "image";

      if (type === activeType) {
        return;
      }

      activeType = type;
      activeCategory = null;
      activeCategoryLabel = "";
      syncCategoryLists();

      typeTabs.forEach(function (node) {
        var isActive = node === tab;
        node.classList.toggle("is-active", isActive);
        node.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      gallery.hidden = true;
      gallery.innerHTML = "";
      updateDropzoneCopy();
      renderCategories();

      var list = currentCategories();

      if (list.length > 0) {
        loadCategory(list[0].key, list[0].label);
      }
    });
  });

  root.querySelectorAll("[data-media-library-page-upload-trigger]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      triggerUpload();
    });
  });

  if (dropzone) {
    dropzone.addEventListener("click", function (event) {
      if (
        event.target.closest(
          "[data-media-library-page-upload-trigger], .media-library-page__file-link, .media-library-page__file-actions",
        )
      ) {
        return;
      }

      if (!activeCategory) {
        return;
      }

      triggerUpload();
    });

    dropzone.addEventListener("dragover", function (event) {
      event.preventDefault();
      dropzone.classList.add("is-dragover");
    });

    dropzone.addEventListener("dragleave", function () {
      dropzone.classList.remove("is-dragover");
    });

    dropzone.addEventListener("drop", function (event) {
      event.preventDefault();
      dropzone.classList.remove("is-dragover");

      if (!activeCategory || !event.dataTransfer?.files?.length) {
        return;
      }

      uploadFiles(event.dataTransfer.files);
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (!fileInput.files?.length) {
        return;
      }

      uploadFiles(fileInput.files);
    });
  }

  function boot() {
    syncCategoryLists();
    updateDropzoneCopy();
    renderCategories();

    if (imageCategoryList.length > 0) {
      loadCategory(imageCategoryList[0].key, imageCategoryList[0].label);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
