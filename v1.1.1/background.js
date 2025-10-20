let redirectEnabled = false;

// 🟢 Badge updater function
function updateBadge(enabled) {
  if (enabled) {
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#22c55e" }); // green
  } else {
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#ef4444" }); // red
  }
}

// 🧠 Load saved settings on startup
chrome.storage.sync.get(["redirectEnabled", "redirectUrl"], (data) => {
  if (data.redirectEnabled !== undefined) redirectEnabled = data.redirectEnabled;
  if (data.redirectUrl) applyRedirectRule(data.redirectUrl);

  // 🔄 Update badge instantly when extension starts
  updateBadge(redirectEnabled);
});

// 🧩 Listen for storage changes (when popup saves)
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") {
    if (changes.redirectEnabled) {
      redirectEnabled = changes.redirectEnabled.newValue;
      console.log(`Redirect Enabled: ${redirectEnabled}`);
      updateBadge(redirectEnabled); // 🟢 Update badge when toggled
    }
    if (changes.redirectUrl) {
      applyRedirectRule(changes.redirectUrl.newValue);
    }
  }
});

// 🚀 Apply redirect rule
function applyRedirectRule(toUrl) {
  if (!toUrl) return;

  chrome.declarativeNetRequest.updateDynamicRules(
    {
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
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Rule update failed:", chrome.runtime.lastError.message);
      } else {
        console.log("Redirect rule applied to:", toUrl);
      }
    }
  );
}

// 🧾 Optional: Debug log when rule triggers
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  if (redirectEnabled) console.log("Redirect triggered:", info);
});

// 💬 Handle messages from popup (manual updates)
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "updateRedirect") {
    redirectEnabled = message.redirectEnabled;
    updateBadge(redirectEnabled); // 🔄 Badge update

    if (redirectEnabled && message.redirectUrl) {
      applyRedirectRule(message.redirectUrl);
    } else {
      // Remove redirect if disabled
      chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] });
    }
  }
});
