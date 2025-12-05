# 🐞 bug-tracer

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](../../actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-black.svg)](package.json)

> **bug-tracer** is a lightweight session recorder and replay tool built with React + Vite. It helps developers capture UI interactions, export session data as JSON, and replay bug reports with a rich, dev-focused UI.

---

## 🚀 Why bug-tracer?

- **Streamlines debugging:** Capture real user interactions for fast, accurate troubleshooting.
- **Feature-rich:** 
  - Record browser events (mouse, keyboard, scroll, etc.)
  - Export session data as compact JSON
  - Modern Replay UI: timeline scrubber, playback speed, neon cursor, event highlights
  - Devtools-inspired design, built for frontend debugging
- **Attractive for recruiters/devs:** Tech-forward approach to frontend event tracking and playback, with real value for development teams. Demonstrates strong skills in React, UI/UX, and modern devtools.

---

## 📦 Folder Structure

```
bug-tracer/
├── public/                # Static files and assets
├── src/                   # Application source code
├── index.html             # Application entrypoint
├── package.json           # Project metadata & dependencies
├── package-lock.json      # Dependency lock file
├── vite.config.js         # Vite configuration
├── eslint.config.js       # Linting rules
├── LICENSE                # Project license (MIT)
├── README.md              # Project documentation
```

---

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/)
- **Tooling:** ESLint, GitHub Actions, npm
- **Language:** JavaScript, JSX
- **UI/UX:** Custom Replay Controls, Timeline Scrubber, Neon Cursor Animation

---

## 🏁 Getting Started

Clone and launch the development server:

```bash
git clone https://github.com/0xSris/bug-tracer.git
cd bug-tracer
npm install
npm run dev
```

Access the app at [http://localhost:5173](http://localhost:5173).

---

## 💡 Usage

### 1. Recorder Page

- Click "Start Recording" to capture session events: clicks, keystrokes, scrolls, etc.
- Click "Stop Recording" when finished.
- Export the session with "Export JSON" for later replay.

```jsx
// Example: Recorder session usage
<Recorder onExport={handleExport} />
```

### 2. Replay Page

- Paste or upload a previously exported session JSON.
- Interactively replay the session:
  - **Timeline scrubber** to jump to events
  - **Neon cursor** visualization
  - **Playback speed** controls

```jsx
// Example: Load replay data
<Replay session={importedData} />
```

---

## 📸 Screenshots & Demos

<!-- Replace with actual images/gifs -->
![Recorder UI](docs/screenshot-recorder.png)
![Replay UI](docs/screenshot-replay.gif)

---

## 🗂️ Docs & Support

- **Issues:** [issues](../../issues)
- **Documentation:** See the [docs](docs/) folder (if available).
- **Contributing:** See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## 👤 Maintainers & Contributing

Maintained by [@0xSris](https://github.com/0xSris) and contributors.

We welcome PRs and issues! Please review [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for the guidelines.

---

## 🤩 Why This Stands Out

Bug-tracer puts professional-grade frontend event recording and replay in every dev's hands. It’s ideal for building debugging tools, QA automation, or showing off real engineering skills to recruiters (devtools, event systems, UX). Robust, modern, extensible, and truly useful.

---

_See [LICENSE](LICENSE) for license info. For more help, open an [issue](../../issues)._
