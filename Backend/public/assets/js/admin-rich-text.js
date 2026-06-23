/**
 * BIHE Admin — CKEditor 4 for rich text fields (all textarea[data-rich-text]).
 * HTML is sanitized server-side via HTMLPurifier before storage.
 */
(function () {
  var INIT_ATTEMPTS = 0;
  var MAX_INIT_ATTEMPTS = 60;
  var MIN_EDITOR_HEIGHT = 160;
  var INIT_STARTED = false;

  function getCsrfToken() {
    var meta = document.querySelector('meta[name="csrf-token"]');

    return meta ? meta.getAttribute("content") || "" : "";
  }

  function getUploadUrl() {
    return window.BIHE_RICH_TEXT && window.BIHE_RICH_TEXT.uploadUrl
      ? window.BIHE_RICH_TEXT.uploadUrl
      : "";
  }

  function bindUploadCsrf() {
    var csrf = getCsrfToken();

    if (!csrf || typeof window.CKEDITOR === "undefined") {
      return;
    }

    CKEDITOR.on("fileUploadRequest", function (event) {
      event.data.requestData._token = csrf;
    });
  }

  function editorConfig() {
    var uploadUrl = getUploadUrl();

    return {
      customConfig: "",
      skin: "moono-lisa",
      language: "en",
      toolbar: [
        {
          name: "clipboard",
          items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"],
        },
        {
          name: "links",
          items: ["Link", "Unlink"],
        },
        {
          name: "insert",
          items: ["Image", "Table", "HorizontalRule", "SpecialChar"],
        },
        {
          name: "tools",
          items: ["Maximize", "Source"],
        },
        "/",
        {
          name: "basicstyles",
          items: ["Bold", "Italic", "Strike", "Underline", "RemoveFormat"],
        },
        {
          name: "paragraph",
          items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent", "Blockquote"],
        },
        {
          name: "styles",
          items: ["Format"],
        },
      ],
      extraPlugins: "editorplaceholder",
      editorplaceholder: "Start typing here...",
      removePlugins: "elementspath,magicline",
      toolbarCanCollapse: false,
      startupMode: "wysiwyg",
      height: 280,
      allowedContent:
        "h1 h2 h3 h4 h5 h6 p br strong b em i u s strike sub sup;" +
        "ul ol li;" +
        "blockquote hr;" +
        "table thead tbody tfoot tr th td[colspan,rowspan];" +
        "a[!href,target,rel,title];" +
        "img[!src,alt,width,height,class]",
      disallowedContent: "script; style; *[on*]",
      enterMode: CKEDITOR.ENTER_P,
      shiftEnterMode: CKEDITOR.ENTER_BR,
      linkDefaultProtocol: "https://",
      filebrowserImageUploadUrl: uploadUrl,
      filebrowserUploadUrl: uploadUrl ? uploadUrl + "?responseType=json" : "",
      format_tags: "p;h1;h2;h3;h4;h5;h6;pre",
      versionCheck: false,
    };
  }

  function resolveFieldId(field, index) {
    if (field.id && field.id !== "body") {
      return field.id;
    }

    if (field.id === "body") {
      field.id = "rich-text-body";
      return field.id;
    }

    field.id = "rich-text-field-" + index;
    return field.id;
  }

  function hasMeaningfulHtml(html) {
    return !!html && !!html.replace(/<br[^>]*>/gi, "").replace(/&nbsp;/gi, " ").trim();
  }

  function restorePlainTextarea(field) {
    if (!field) {
      return;
    }

    field.style.display = "block";
    field.style.visibility = "visible";
    field.style.opacity = "1";
    field.style.minHeight = "11.25rem";
    field.style.width = "100%";
    field.style.position = "";
    field.style.clip = "";
    field.removeAttribute("data-rich-text-bound");
    delete field.dataset.richTextBound;
  }

  function ensureEditorVisible(editor, height) {
    if (!editor || !editor.container) {
      return;
    }

    var chrome = editor.container.$;

    if (chrome) {
      chrome.style.visibility = "visible";
      chrome.style.opacity = "1";
      chrome.style.display = "";
      chrome.style.minHeight = Math.max(height, MIN_EDITOR_HEIGHT) + "px";
    }

    var contents = editor.ui && editor.ui.space ? editor.ui.space("contents") : null;

    if (contents && contents.$) {
      contents.$.style.minHeight = Math.max(height - 40, 120) + "px";
      contents.$.style.height = Math.max(height - 40, 120) + "px";
      contents.$.style.visibility = "visible";
    }

    try {
      editor.resize("100%", Math.max(height, MIN_EDITOR_HEIGHT));
    } catch (_error) {
      /* ignore resize failures */
    }
  }

  function loadInitialContent(editor, initialValue) {
    if (!initialValue || !String(initialValue).trim() || !editor.editable()) {
      return;
    }

    var current = editor.getData();

    if (!hasMeaningfulHtml(current)) {
      editor.setData(initialValue);
    }
  }

  function finalizeEditor(editor, initialValue, height) {
    if (!editor || !editor.editable()) {
      return false;
    }

    editor.setReadOnly(false);
    ensureEditorVisible(editor, height);
    loadInitialContent(editor, initialValue);
    return true;
  }

  function watchEditorReady(editor, initialValue, field, height) {
    if (editor._biheRichTextReady || editor._biheRichTextPolling) {
      return;
    }

    editor._biheRichTextPolling = true;
    var attempt = 0;

    (function poll() {
      if (editor._biheRichTextReady) {
        return;
      }

      if (finalizeEditor(editor, initialValue, height)) {
        editor._biheRichTextReady = true;
        return;
      }

      attempt += 1;

      if (attempt >= 20) {
        if (field && editor.element) {
          try {
            editor.destroy(true);
          } catch (_error) {
            /* ignore */
          }
        }

        restorePlainTextarea(field);
        return;
      }

      window.setTimeout(poll, 150);
    })();
  }

  function syncAllEditors() {
    if (typeof window.CKEDITOR === "undefined") {
      return;
    }

    Object.keys(CKEDITOR.instances).forEach(function (instanceId) {
      var instance = CKEDITOR.instances[instanceId];

      if (instance) {
        instance.updateElement();
      }
    });
  }

  function bindEditorToForm(editor, field) {
    var form = field && field.form;

    if (!form || form.dataset.richTextSubmitBound === "1") {
      return;
    }

    form.dataset.richTextSubmitBound = "1";

    form.addEventListener(
      "submit",
      function () {
        syncAllEditors();
      },
      true
    );

    form.querySelectorAll('button[type="submit"], input[type="submit"]').forEach(function (button) {
      button.addEventListener(
        "click",
        function () {
          syncAllEditors();
        },
        true
      );
    });
  }

  function bindFormSubmit() {
    document.querySelectorAll("form").forEach(function (form) {
      if (form.dataset.richTextSubmitBound === "1") {
        return;
      }

      form.dataset.richTextSubmitBound = "1";

      form.addEventListener(
        "submit",
        function () {
          syncAllEditors();
        },
        true
      );

      form.querySelectorAll('button[type="submit"], input[type="submit"]').forEach(function (button) {
        button.addEventListener(
          "click",
          function () {
            syncAllEditors();
          },
          true
        );
      });
    });
  }

  function bindEarlyEditorSync() {
    if (document.documentElement.dataset.richTextEarlySyncBound === "1") {
      return;
    }

    document.documentElement.dataset.richTextEarlySyncBound = "1";

    document.addEventListener(
      "mousedown",
      function (event) {
        var submitter = event.target.closest('button[type="submit"], input[type="submit"]');

        if (!submitter || submitter.disabled || !submitter.form) {
          return;
        }

        syncAllEditors();
      },
      true
    );
  }

  function initRichTextEditors() {
    var fields = document.querySelectorAll("textarea[data-rich-text]:not([data-rich-text-bound])");

    if (!fields.length) {
      return;
    }

    if (typeof window.CKEDITOR === "undefined") {
      INIT_ATTEMPTS += 1;

      if (INIT_ATTEMPTS < MAX_INIT_ATTEMPTS) {
        window.setTimeout(initRichTextEditors, 50);
        return;
      }

      fields.forEach(restorePlainTextarea);
      return;
    }

    if (!INIT_STARTED) {
      INIT_STARTED = true;

      if (window.BIHE_RICH_TEXT && window.BIHE_RICH_TEXT.basePath) {
        CKEDITOR.basePath = window.BIHE_RICH_TEXT.basePath;
      }

      CKEDITOR.env.hc = false;
      CKEDITOR.env.cssClass = (CKEDITOR.env.cssClass || "").replace(/\s*cke_hc\b/g, "");
      CKEDITOR.config.versionCheck = false;
      CKEDITOR.disableAutoInline = true;
      bindUploadCsrf();
    }

    fields.forEach(function (field, index) {
      field.dataset.richTextBound = "1";
      field.style.minHeight = "11.25rem";

      window.setTimeout(function () {
        if (!field.isConnected) {
          return;
        }

        resolveFieldId(field, index);

        if (field.id && CKEDITOR.instances[field.id]) {
          return;
        }

        var initialValue = field.value;
        var config = editorConfig();
        var customHeight = parseInt(field.getAttribute("data-rich-text-height"), 10);
        var toolbarMode = field.getAttribute("data-rich-text-toolbar");
        var editorHeight = MIN_EDITOR_HEIGHT;

        if (toolbarMode === "none") {
          config.toolbar = [];
        }

        if (!Number.isNaN(customHeight) && customHeight > 0) {
          editorHeight = Math.max(customHeight, MIN_EDITOR_HEIGHT);
          config.height = editorHeight;
        }

        var editor;

        try {
          editor = CKEDITOR.replace(field, config);
        } catch (_error) {
          restorePlainTextarea(field);
          return;
        }

        if (!editor) {
          restorePlainTextarea(field);
          return;
        }

        editor.on("change", function () {
          this.updateElement();
        });

        editor.on("blur", function () {
          this.updateElement();
        });

        editor.on("instanceReady", function () {
          bindEditorToForm(this, field);
          watchEditorReady(this, initialValue, field, editorHeight);
          window.requestAnimationFrame(function () {
            ensureEditorVisible(editor, editorHeight);
          });
        });

        editor.on("contentDom", function () {
          watchEditorReady(this, initialValue, field, editorHeight);
        });
      }, index * 80);
    });

    bindFormSubmit();
  }

  function bootRichTextEditors() {
    bindEarlyEditorSync();
    bindFormSubmit();

    if (document.readyState === "complete") {
      window.requestAnimationFrame(initRichTextEditors);
      return;
    }

    window.addEventListener(
      "load",
      function () {
        window.requestAnimationFrame(initRichTextEditors);
      },
      { once: true }
    );
  }

  bootRichTextEditors();
})();
