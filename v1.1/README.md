# 🚀 Auto Redirector v1.1 (YouTube Only)

A lightweight and smarter browser extension that **automatically redirects YouTube** (or other specified sites) to your preferred URL — now with a toggle and custom input support.  
Compatible with all Chromium-based browsers.

---

## 🧩 Features

- ⚡ Instantly redirects YouTube links to your chosen URL  
- 🟢 **Enable / Disable toggle** for instant control  
- 🖊️ **Custom redirect URL input** — choose your own destination  
- 🧠 Automatically fixes missing `https://` or `http://`  
- 💾 Settings are saved automatically using Chrome Sync Storage  
- 🔒 100% privacy-safe — no external connections or tracking  
- 🧱 Built on the latest **Manifest V3** architecture  

---

## 🌍 Browser Compatibility

| Browser | Supported | Notes |
|----------|------------|-------|
| 🟦 Google Chrome | ✅ Yes | Fully compatible |
| 🟩 Microsoft Edge | ✅ Yes | Tested and stable |
| 🟧 Brave | ✅ Yes | Works seamlessly |
| 🟥 Opera | ✅ Yes | Verified support |
| 🦊 Firefox | ❌ Not supported | (MV3 background support incomplete) |

---

## 🧰 How It Works

Auto Redirector v1.1 allows you to control redirections right from the popup UI.  
You can toggle the feature on/off and choose where YouTube should redirect.

Example:  
- Visiting `https://www.youtube.com/watch?v=xyz`  
  → Automatically redirects to your custom destination (e.g. `https://example.com`)

---

## 📁 Folder Structure

v1.1/
├── manifest.json # Manifest V3 configuration
├── background.js # Handles redirect logic via DNR
├── popup.html # Popup UI (on/off toggle + URL input)
├── popup.js # Popup logic and Chrome storage
└── icons/ # (Optional) Extension icons

---

## ⚙️ Installation

### 🧭 For Chrome / Edge / Brave / Opera

1. Download or clone this repository  
   ```bash
   git clone https://github.com/TehamiKamdar/auto-redirector.git