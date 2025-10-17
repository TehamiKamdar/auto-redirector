document.addEventListener("DOMContentLoaded", () => {

  const redirectToggle = document.getElementById("redirectToggle")
  const redirectUrlInput = document.getElementById("redirectUrl")
  const saveBtn = document.getElementById("saveBtn")
  const statusMessage = document.getElementById("statusMessage")

  chrome.storage.sync.get(["redirectEnabled", "redirectUrl"], (data) => {
    if (data.redirectEnabled !== undefined) {
      redirectToggle.checked = data.redirectEnabled;
    }
    if (data.redirectUrl) {
      redirectUrl.value = data.redirectUrl;
    }
  })

  saveBtn.addEventListener("click", () => {
    let redirectUrl = redirectUrlInput.value.trim();

    // Auto-fix missing protocol
    if (redirectUrl && !/^https?:\/\//i.test(redirectUrl)) {
      redirectUrl = "https://" + redirectUrl;
    }

    const redirectEnabled = redirectToggle.checked;

    chrome.storage.sync.set(
      {
        redirectUrl,
        redirectEnabled
      },
      () => {
        if (chrome.runtime.lastError) {
          showStatus("Failed to save settings.", "error");
          console.error("Storage error:", chrome.runtime.lastError.message);
        } else {
          showStatus("Settings saved successfully!", "success");
          chrome.runtime.sendMessage({
            type: "updateRedirect",
            redirectEnabled,
            redirectUrl
          });
        }
      }
    );
  });


  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`
    setTimeout(() => {
      statusMessage.style.display = "none"
    }, 2500);
    statusMessage.style.display = "block"
  }

})