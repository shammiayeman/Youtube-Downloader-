# 🎬 YouTube Downloader

![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

A minimal, lightweight cross-platform desktop application built with **Electron** and **Vanilla JavaScript** to download YouTube videos directly to your computer without ads or complex setups.

---

## 🖼️ App Preview
> `![App Screenshot](SS.png)`

---

## ✨ Key Features

- **Clean & Minimal UI:** Distraction-free interface with instant URL validation and real-time status feedback.
- **Native File Dialog:** Choose exactly where to save your `.mp4` video using your OS's native save prompt.
- **Secure Architecture:** Implements Electron's `contextIsolation` and `preload.js` bridge for safe Inter-Process Communication (IPC).
- **Cross-Platform Ready:** Pre-configured with `electron-builder` for Windows (`.exe`), Linux (`AppImage`, `.deb`), and macOS (`.dmg`).

---

## 📂 Project Structure

```text
yt-downloader/
├── main.js          # Electron main process, window creation & download IPC handler
├── preload.js       # Secure contextBridge exposing IPC methods to the UI
├── renderer.js      # Frontend DOM events and status updates
├── index.html       # Application UI markup
├── style.css        # Clean, centered card styling
└── package.json     # Dependencies, scripts, and electron-builder config
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm start
```

### 3. Build Desktop Installer
```bash
npm run dist        # Build for current OS
npm run dist:win    # Build Windows installer
npm run dist:linux  # Build Linux AppImage & deb
npm run dist:mac    # Build macOS dmg
```

---

## 👤 Author

**Shammi Ayeman**  
📧 shammiayeman313@gmail.com  
📄 Licensed under the [MIT License](LICENSE)