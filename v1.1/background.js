let redirectEnabled = true;

chrome.storage.sync.get(["redirectEnabled", "redirectUrl"], (data) => {
  if (data.redirectEnabled !== undefined) redirectEnabled = data.redirectEnabled;
  if (data.redirectUrl) applyRedirectRule(data.redirectUrl);
});

// Listen for storage changes (when popup saves)
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") {
    if (changes.redirectEnabled) {
      redirectEnabled = changes.redirectEnabled.newValue;
      console.log(`Redirect Enabled: ${redirectEnabled}`);
    }
    if (changes.redirectUrl) {
      applyRedirectRule(changes.redirectUrl.newValue);
    }
  }
});

function applyRedirectRule(toUrl) {
  if (!toUrl) return;

  // Correct API name: updateDynamicRules (not updateDynamicRule)
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "redirect",
          redirect: { url: toUrl },
        },
        condition: {
          urlFilter: "youtube.com",
          resourceTypes: ["main_frame"],
        },
      },
    ],
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Rule update failed:", chrome.runtime.lastError.message);
    } else {
      console.log("Redirect rule applied to:", toUrl);
    }
  });
}

// Optional: Debug when rule is triggered
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  if (redirectEnabled) console.log("Redirect triggered:", info);
});

// Listen for popup messages (manual update)
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "updateRedirect") {
    redirectEnabled = message.redirectEnabled;
    if (redirectEnabled && message.redirectUrl) {
      applyRedirectRule(message.redirectUrl);
    } else {
      // Remove redirect if disabled
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
      });
    }
  }
});