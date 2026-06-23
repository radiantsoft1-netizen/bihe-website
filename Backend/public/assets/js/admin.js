/**
 * BIHE Admin — vanilla JS (no build step; Hostinger-compatible)
 */
(function () {
  var toggle = document.getElementById("sidebar-toggle");
  var sidebar = document.getElementById("admin-sidebar");

  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("is-open");
    });
  }

  var navSearch = document.getElementById("admin-nav-search");
  var navList = document.getElementById("admin-nav");
  var navEmpty = document.getElementById("admin-nav-empty");

  if (navSearch && navList) {
    var navItems = navList.querySelectorAll("li[data-nav-label]");

    function setCollapsibleGroupState(group, shouldOpen) {
      group.classList.toggle("is-open", shouldOpen);

      var toggle = group.querySelector("[data-nav-group-toggle]");

      if (toggle) {
        toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
      }
    }

    function syncCollapsibleGroups(query) {
      navList.querySelectorAll(".admin-nav__group--collapsible").forEach(function (group) {
        if (query) {
          var visibleChildren = group.querySelectorAll(
            ".admin-nav__submenu > li:not(.is-hidden)"
          ).length;
          var groupLabel = group.getAttribute("data-nav-label") || "";
          var groupMatches = groupLabel.indexOf(query) !== -1;

          setCollapsibleGroupState(group, groupMatches || visibleChildren > 0);
          return;
        }

        var hasActiveChild = !!group.querySelector(".admin-nav__submenu a.is-active");
        setCollapsibleGroupState(group, hasActiveChild);
      });
    }

    function filterAdminNav() {
      var query = navSearch.value.trim().toLowerCase();
      var visibleCount = 0;

      navItems.forEach(function (item) {
        var label = item.getAttribute("data-nav-label") || "";
        var matches = !query || label.indexOf(query) !== -1;
        item.classList.toggle("is-hidden", !matches);

        if (matches) {
          visibleCount += 1;
        }
      });

      navList.querySelectorAll(".admin-nav__group").forEach(function (group) {
        var visibleChildren = group.querySelectorAll(
          ".admin-nav__submenu > li:not(.is-hidden)"
        ).length;
        var groupLabel = group.getAttribute("data-nav-label") || "";
        var groupMatches = !query || groupLabel.indexOf(query) !== -1;

        if (groupMatches || visibleChildren > 0) {
          group.classList.remove("is-hidden");
          if (groupMatches) {
            visibleCount += 1;
          }
        } else {
          group.classList.add("is-hidden");
        }
      });

      syncCollapsibleGroups(query);

      if (navEmpty) {
        var topLevelVisible = navList.querySelectorAll(
          "> li:not(.is-hidden):not(.admin-nav__group)"
        ).length;
        var groupsVisible = navList.querySelectorAll(
          ".admin-nav__group:not(.is-hidden)"
        ).length;

        navEmpty.hidden = (topLevelVisible + groupsVisible) > 0 || !query;
      }
    }

    navSearch.addEventListener("input", filterAdminNav);
    navSearch.addEventListener("search", filterAdminNav);
  }

  document.querySelectorAll("[data-nav-group-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var group = button.closest(".admin-nav__group--collapsible");

      if (!group) {
        return;
      }

      var shouldOpen = !group.classList.contains("is-open");
      group.classList.toggle("is-open", shouldOpen);
      button.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    });
  });

  function submitDeleteRequest(url) {
    var form = document.createElement("form");
    var csrf = document.querySelector('meta[name="csrf-token"]');

    form.method = "POST";
    form.action = url;
    form.style.display = "none";

    if (csrf && csrf.content) {
      var csrfInput = document.createElement("input");
      csrfInput.type = "hidden";
      csrfInput.name = "_token";
      csrfInput.value = csrf.content;
      form.appendChild(csrfInput);
    }

    var methodInput = document.createElement("input");
    methodInput.type = "hidden";
    methodInput.name = "_method";
    methodInput.value = "DELETE";
    form.appendChild(methodInput);

    document.body.appendChild(form);
    form.submit();
  }

  var deleteConfirmModal = document.querySelector("[data-delete-confirm-modal]");
  var deleteConfirmMessage = deleteConfirmModal
    ? deleteConfirmModal.querySelector("[data-delete-confirm-message]")
    : null;
  var deleteConfirmAccept = deleteConfirmModal
    ? deleteConfirmModal.querySelector("[data-delete-confirm-accept]")
    : null;
  var pendingDeleteAction = null;
  var lastFocusedBeforeDeleteConfirm = null;

  function buildDeleteMessage(label, count) {
    if (typeof count === "number" && count > 1) {
      return "Delete " + count + " selected items? This action cannot be undone.";
    }

    if (label) {
      return 'Delete "' + label + '"? This action cannot be undone.';
    }

    return "Are you sure you want to delete this item? This action cannot be undone.";
  }

  function askDeleteConfirmation(message, onConfirm) {
    if (typeof onConfirm !== "function") {
      return;
    }

    if (!deleteConfirmModal || !deleteConfirmAccept) {
      if (window.confirm(message)) {
        onConfirm();
      }

      return;
    }

    pendingDeleteAction = onConfirm;
    lastFocusedBeforeDeleteConfirm = document.activeElement;

    if (deleteConfirmMessage) {
      deleteConfirmMessage.textContent = message;
    }

    deleteConfirmModal.hidden = false;
    document.body.classList.add("admin-delete-confirm-open");
    deleteConfirmAccept.focus();
  }

  function closeDeleteConfirmation() {
    if (!deleteConfirmModal) {
      pendingDeleteAction = null;
      return;
    }

    deleteConfirmModal.hidden = true;
    document.body.classList.remove("admin-delete-confirm-open");
    pendingDeleteAction = null;

    if (lastFocusedBeforeDeleteConfirm && typeof lastFocusedBeforeDeleteConfirm.focus === "function") {
      lastFocusedBeforeDeleteConfirm.focus();
    }
  }

  function acceptDeleteConfirmation() {
    var action = pendingDeleteAction;
    closeDeleteConfirmation();

    if (action) {
      action();
    }
  }

  if (deleteConfirmModal) {
    deleteConfirmModal.querySelectorAll("[data-delete-confirm-cancel]").forEach(function (button) {
      button.addEventListener("click", closeDeleteConfirmation);
    });

    if (deleteConfirmAccept) {
      deleteConfirmAccept.addEventListener("click", acceptDeleteConfirmation);
    }

    document.addEventListener("keydown", function (event) {
      if (deleteConfirmModal.hidden) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeDeleteConfirmation();
        return;
      }

      if (event.key === "Enter" && event.target === deleteConfirmAccept) {
        event.preventDefault();
        acceptDeleteConfirmation();
      }
    });
  }

  window.BIHE_confirmDelete = askDeleteConfirmation;

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-confirm-delete-btn]");

    if (!button) {
      return;
    }

    event.preventDefault();

    var deleteUrl = button.getAttribute("data-delete-url");

    if (!deleteUrl) {
      return;
    }

    var label = button.getAttribute("data-delete-label") || "";

    askDeleteConfirmation(buildDeleteMessage(label), function () {
      submitDeleteRequest(deleteUrl);
    });
  });

  document.addEventListener("submit", function (event) {
    var form = event.target;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    if (form.hasAttribute("data-confirm-delete") || form.hasAttribute("data-admin-bulk-delete-form")) {
      if (form.dataset.deleteConfirmed === "1") {
        delete form.dataset.deleteConfirmed;
        return;
      }

      event.preventDefault();

      var message = form.getAttribute("data-delete-message");

      if (!message && form.hasAttribute("data-admin-bulk-delete-form")) {
        var count = 0;

        form.querySelectorAll("[data-admin-bulk-row]").forEach(function (checkbox) {
          if (checkbox.checked) {
            count += 1;
          }
        });

        if (!count) {
          return;
        }

        message = buildDeleteMessage("", count);
      }

      if (!message) {
        message = buildDeleteMessage("");
      }

      askDeleteConfirmation(message, function () {
        form.dataset.deleteConfirmed = "1";
        form.requestSubmit();
      });
    }
  }, true);

  document.querySelectorAll("[data-admin-bulk-delete-form]").forEach(function (form) {
    var deleteButton = document.querySelector('[data-admin-bulk-delete-btn][form="' + form.id + '"]')
      || form.querySelector("[data-admin-bulk-delete-btn]");
    var selectAll = form.querySelector("[data-admin-bulk-select-all]");
    var rowChecks = form.querySelectorAll("[data-admin-bulk-row]");

    function selectedCount() {
      var count = 0;

      rowChecks.forEach(function (checkbox) {
        if (checkbox.checked) {
          count += 1;
        }
      });

      return count;
    }

    function updateBulkState() {
      var count = selectedCount();

      if (deleteButton) {
        deleteButton.disabled = count === 0;
        deleteButton.textContent = count > 1
          ? "Delete selected (" + count + ")"
          : "Delete selected";
      }

      if (selectAll) {
        selectAll.indeterminate = count > 0 && count < rowChecks.length;
        selectAll.checked = rowChecks.length > 0 && count === rowChecks.length;
      }
    }

    if (selectAll) {
      selectAll.addEventListener("change", function () {
        rowChecks.forEach(function (checkbox) {
          checkbox.checked = selectAll.checked;
        });
        updateBulkState();
      });
    }

    rowChecks.forEach(function (checkbox) {
      checkbox.addEventListener("change", updateBulkState);
    });

    updateBulkState();
  });

  var loginTypeInput = document.getElementById("login_type");
  var loginField = document.getElementById("login");
  var loginLabel = document.getElementById("login-label");
  var loginTypeButtons = document.querySelectorAll("[data-login-type]");

  if (loginTypeInput && loginField && loginLabel) {
    loginTypeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var type = button.getAttribute("data-login-type");
        loginTypeInput.value = type;
        loginLabel.textContent = type === "username" ? "Username" : "Email";
        loginField.type = type === "username" ? "text" : "email";
        loginField.autocomplete = type === "username" ? "username" : "email";
        loginField.focus();

        loginTypeButtons.forEach(function (btn) {
          btn.classList.toggle("is-active", btn === button);
        });
      });
    });
  }

  var captchaRefresh = document.getElementById("captcha-refresh");
  var captchaQuestion = document.getElementById("captcha-question");
  var captchaAnswer = document.getElementById("captcha_answer");

  var csrfToken = document.querySelector('meta[name="csrf-token"]');

  function normalizeOrderValue(value) {
    return String(Math.max(0, parseInt(value, 10) || 0));
  }

  function initSortOrdersSave(config) {
    var saveButton = document.getElementById(config.buttonId);
    if (!saveButton) {
      return;
    }

    var orderInputs = document.querySelectorAll(config.inputSelector);
    if (!orderInputs.length) {
      return;
    }

    function ordersDirty() {
      var dirty = false;

      orderInputs.forEach(function (input) {
        var initialValue = input.getAttribute("data-initial-order") || "0";
        if (normalizeOrderValue(input.value) !== normalizeOrderValue(initialValue)) {
          dirty = true;
        }
      });

      return dirty;
    }

    function setOrderState(input, state) {
      input.classList.remove("is-saving", "is-saved", "is-error");
      if (state) {
        input.classList.add(state);
      }
    }

    function updateSaveButton() {
      saveButton.disabled = !ordersDirty();
    }

    orderInputs.forEach(function (input) {
      input.addEventListener("input", updateSaveButton);
      input.addEventListener("change", function () {
        input.value = normalizeOrderValue(input.value);
        updateSaveButton();
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          if (!saveButton.disabled) {
            saveButton.click();
          }
        }
      });
    });

    saveButton.addEventListener("click", function () {
      var saveUrl = saveButton.getAttribute("data-sort-orders-url");
      if (!saveUrl || saveButton.disabled) {
        return;
      }

      if (!csrfToken || !csrfToken.content) {
        window.location.reload();
        return;
      }

      var orders = [];
      orderInputs.forEach(function (input) {
        orders.push({
          id: Number(input.getAttribute(config.idAttribute)),
          sort_order: Number(normalizeOrderValue(input.value)),
        });
      });

      saveButton.disabled = true;
      saveButton.textContent = "Saving...";
      orderInputs.forEach(function (input) {
        setOrderState(input, "is-saving");
        input.disabled = true;
      });

      fetch(saveUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrfToken.content,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ orders: orders }),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("save_failed");
          }

          return response.json();
        })
        .then(function () {
          orderInputs.forEach(function (input) {
            var savedValue = normalizeOrderValue(input.value);
            input.value = savedValue;
            input.setAttribute("data-initial-order", savedValue);
            setOrderState(input, "is-saved");
          });

          saveButton.textContent = "Updated";
          window.setTimeout(function () {
            saveButton.textContent = "Update Display Order";
            orderInputs.forEach(function (input) {
              setOrderState(input, "");
            });
            updateSaveButton();
          }, 1200);
        })
        .catch(function () {
          orderInputs.forEach(function (input) {
            input.value = normalizeOrderValue(input.getAttribute("data-initial-order") || "0");
            setOrderState(input, "is-error");
          });

          saveButton.textContent = "Update failed";
          window.setTimeout(function () {
            saveButton.textContent = "Update Display Order";
            orderInputs.forEach(function (input) {
              setOrderState(input, "");
            });
            updateSaveButton();
          }, 1800);
        })
        .finally(function () {
          orderInputs.forEach(function (input) {
            input.disabled = false;
          });
        });
    });
  }

  initSortOrdersSave({
    buttonId: "faculty-sort-orders-save",
    inputSelector: "[data-faculty-id]",
    idAttribute: "data-faculty-id",
  });

  initSortOrdersSave({
    buttonId: "alumni-profiles-sort-orders-save",
    inputSelector: "[data-alumni-profile-id]",
    idAttribute: "data-alumni-profile-id",
  });

  initSortOrdersSave({
    buttonId: "alumni-events-sort-orders-save",
    inputSelector: "[data-alumni-event-id]",
    idAttribute: "data-alumni-event-id",
  });

  if (captchaRefresh && captchaQuestion) {
    captchaRefresh.addEventListener("click", function () {
      captchaRefresh.disabled = true;

      fetch("/admin/captcha/refresh", {
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.question) {
            captchaQuestion.textContent = data.question;
            if (captchaAnswer) {
              captchaAnswer.value = "";
              captchaAnswer.focus();
            }
          }
        })
        .catch(function () {
          window.location.reload();
        })
        .finally(function () {
          captchaRefresh.disabled = false;
        });
    });
  }

  document.querySelectorAll("[data-form-multi-select]").forEach(function (root) {
    var trigger = root.querySelector(".form-multi-select__trigger");
    var panel = root.querySelector("[data-form-multi-select-panel]");
    var valueNode = root.querySelector("[data-form-multi-select-value]");
    var inputs = root.querySelectorAll("[data-form-multi-select-input]");
    var errorNode = root.querySelector("[data-form-multi-select-error]");
    var placeholder = root.getAttribute("data-placeholder") || "Select options...";
    var isRequired = root.getAttribute("data-required") === "true";

    if (!trigger || !panel || !valueNode || !inputs.length) {
      return;
    }

    function selectedLabels() {
      var labels = [];

      inputs.forEach(function (input) {
        if (input.checked) {
          labels.push(input.getAttribute("data-label") || input.value);
        }
      });

      return labels;
    }

    function clearValidation() {
      root.classList.remove("is-invalid");
      if (errorNode) {
        errorNode.hidden = true;
      }
    }

    function updateValueLabel() {
      var labels = selectedLabels();

      if (!labels.length) {
        valueNode.textContent = placeholder;
        valueNode.classList.add("is-placeholder");
        return;
      }

      clearValidation();
      valueNode.classList.remove("is-placeholder");

      if (labels.length === 1) {
        valueNode.textContent = labels[0];
        return;
      }

      if (labels.length === 2) {
        valueNode.textContent = labels.join(", ");
        return;
      }

      valueNode.textContent = labels.length + " selected";
    }

    function closePanel() {
      root.classList.remove("is-open");
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    function openPanel() {
      root.classList.add("is-open");
      panel.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
    }

    function togglePanel() {
      if (root.classList.contains("is-open")) {
        closePanel();
        return;
      }

      openPanel();
    }

    trigger.addEventListener("click", function () {
      togglePanel();
    });

    inputs.forEach(function (input) {
      input.addEventListener("change", updateValueLabel);
    });

    document.addEventListener("click", function (event) {
      if (!root.contains(event.target)) {
        closePanel();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("is-open")) {
        closePanel();
        trigger.focus();
      }
    });

    if (isRequired) {
      var form = root.closest("form");

      if (form && !form.dataset.multiSelectValidationBound) {
        form.dataset.multiSelectValidationBound = "1";

        form.addEventListener("submit", function (event) {
          var invalidRoots = form.querySelectorAll("[data-form-multi-select][data-required]");

          invalidRoots.forEach(function (requiredRoot) {
            var requiredInputs = requiredRoot.querySelectorAll("[data-form-multi-select-input]:checked");
            var requiredError = requiredRoot.querySelector("[data-form-multi-select-error]");
            var requiredTrigger = requiredRoot.querySelector(".form-multi-select__trigger");

            if (requiredInputs.length) {
              requiredRoot.classList.remove("is-invalid");
              if (requiredError) {
                requiredError.hidden = true;
              }
              return;
            }

            event.preventDefault();
            requiredRoot.classList.add("is-invalid");
            if (requiredError) {
              requiredError.hidden = false;
            }
            requiredRoot.scrollIntoView({ behavior: "smooth", block: "center" });
            requiredRoot.classList.add("is-open");
            var failPanel = requiredRoot.querySelector("[data-form-multi-select-panel]");
            if (failPanel) {
              failPanel.hidden = false;
            }
            if (requiredTrigger) {
              requiredTrigger.setAttribute("aria-expanded", "true");
              requiredTrigger.focus();
            }
          });
        });
      }
    }

    updateValueLabel();
  });

  document.addEventListener(
    "click",
    function (event) {
      var submitter = event.target.closest('button[type="submit"], input[type="submit"]');

      if (!submitter || submitter.disabled) {
        return;
      }

      var form = submitter.form;

      if (!form || !form.classList.contains("admin-form")) {
        return;
      }

      window.requestAnimationFrame(function () {
        if (form.checkValidity()) {
          return;
        }

        var invalid = form.querySelector(":invalid");

        if (!invalid) {
          return;
        }

        invalid.scrollIntoView({ behavior: "smooth", block: "center" });

        try {
          invalid.focus({ preventScroll: true });
        } catch (_error) {
          invalid.focus();
        }

        form.reportValidity();
      });
    },
    true
  );
})();
