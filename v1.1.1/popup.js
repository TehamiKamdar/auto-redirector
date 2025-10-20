document.addEventListener("DOMContentLoaded", () => {
  const redirectToggle = document.getElementById("redirectToggle");
  const redirectUrlInput = document.getElementById("redirectUrl");
  const saveBtn = document.getElementById("saveBtn");
  const statusMessage = document.getElementById("statusMessage");

  // Load existing settings
  chrome.storage.sync.get(["redirectEnabled", "redirectUrl"], (data) => {
    if (data.redirectEnabled !== undefined) {
      redirectToggle.checked = data.redirectEnabled;
      toggleInputState(data.redirectEnabled);
    }
    if (data.redirectUrl) {
      redirectUrlInput.value = data.redirectUrl;
    }
  });

  // Toggle input enable/disable
  redirectToggle.addEventListener("change", () => {
    const enabled = redirectToggle.checked;
    toggleInputState(enabled);
  });

  function toggleInputState(enabled) {
    redirectUrlInput.disabled = !enabled;
    redirectUrlInput.style.opacity = enabled ? "1" : "0.6";
  }

  // Save settings
  saveBtn.addEventListener("click", saveSettings);
  redirectUrlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {saveSettings()};
  });

  function saveSettings() {
    let redirectUrl = redirectUrlInput.value.trim() || "www.example.com";
    const redirectEnabled = redirectToggle.checked;

    // Auto-add https:// if missing
    if (redirectUrl && !/^https?:\/\//i.test(redirectUrl)) {
      redirectUrl = "https://" + redirectUrl;
    }

    chrome.storage.sync.set(
      {
        redirectEnabled,
        redirectUrl,
      },
      () => {
        if (chrome.runtime.lastError) {
          showStatus("❌ Failed to save settings.", "error");
          console.error("Storage error:", chrome.runtime.lastError.message);
        } else {
          showStatus("✅ Settings saved successfully!", "success");
          redirectUrlInput.value = redirectUrl;

          chrome.runtime.sendMessage({
            type: "updateRedirect",
            redirectEnabled,
            redirectUrl,
          });
        }
      }
    );
  }


  // Status display helper
  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = "status-message " + (type === "success" ? "status-success" : "status-error");
    setTimeout(() => {
      statusMessage.textContent = "";
      statusMessage.className = "status-message";
    }, 2500);
  }
});
