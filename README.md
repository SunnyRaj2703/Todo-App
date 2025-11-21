# 🌟 React Todo App 

A beautifully designed **React Todo Application** featuring:
- 🎤 **Voice-controlled todo entries**
- ✏️ Text input support
- 📅 Due-date assignment
- 🌗 Light & Dark Mode
- 🌌 Animated starry sky background (stars + meteors)
- ✔ Complete & Undo tasks
- ❌ Delete tasks

---

## 🚀 Features

### 🔊 Voice Input (Speech Recognition)
Click the 🎤 microphone → speak your todo → it auto-fills the input box.

✔ Supports date detection (say: *"Buy milk on 2025-01-10"*)  
✔ Automatically inserts both **task text** and **date**

Speech recognition is powered using a **custom React hook**:

```
src/useVoiceRecognition.js
```
---

### 📝 Todo Management
- Add tasks by typing or using voice
- Each task contains:
  - Task Name
  - Due Date
- Tasks can be marked **Complete / Undo**
- Delete tasks

---
## 📂 Project Structure

```
src/
│── App.jsx
│── useVoiceRecognition.js
│── index.css
│── main.jsx
└── (optional extra components)
public/
index.html
```

---
## 🛠 Installation & Setup

Run the app locally:

```bash
npm install
npm run dev
```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


