# 🚀 Auto Redirector v1.0

A lightweight browser extension that **automatically redirects specific websites** (like YouTube) to our chosen destination.  
Compatible with all Chromium-based browsers.

---

## 🧩 Features

- ⚡ Instantly redirects any matching URL  
- 🧱 Built on the latest **Manifest V3** standard  
- 🧠 No background CPU usage — uses Chrome’s declarative rules  
- 🔒 100% privacy-safe (no data collection)  
- 🌐 Works across all modern Chromium browsers

---

## 🌍 Browser Compatibility

| Browser | Supported | Notes |
|----------|------------|-------|
| 🟦 Google Chrome | ✅ Yes | Full support |
| 🟩 Microsoft Edge | ✅ Yes | Fully compatible |
| 🟧 Brave | ✅ Yes | Works perfectly |
| 🟥 Opera | ✅ Yes | Tested and stable |
| 🦊 Firefox | ❌ Not yet supported | Awaiting full Manifest V3 support |

---

## 🧰 How It Works

Auto Redirector listens for any request to the domains you specify (e.g. YouTube) and transparently redirects them to your chosen destination URL.

Example:
- Visiting `https://www.youtube.com/`  
  → Automatically redirects to `https://example.com`

---

## 📁 Folder Structure

v1.0/
├── manifest.json # Extension configuration (Manifest V3)
├── background.js # Service worker (required by MV3)
└── rules.json # Redirect rules

---

## ⚙️ Installation

### 🧭 For Chrome / Edge / Brave / Opera
1. Download or clone this repository  
   ```bash
   git clone https://github.com/TehamiKamdar/auto-redirector.git
   
2. Open your browser’s extensions page:

  - Chrome → chrome://extensions

  - Edge → edge://extensions

3. Enable Developer Mode (top-right corner).

4. Click Load unpacked → select the v1.0 folder.

5. Done ✅ — the extension will now auto-redirect YouTube to your set URL.
