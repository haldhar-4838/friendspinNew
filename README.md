# FriendSpin

FriendSpin is a Phase 1 scaffold for an online multiplayer party game website with a React + Vite + Tailwind frontend and a Node.js + Express + Socket.io backend.

## Phase 1 Scope

- Frontend routing and responsive UI pages
- Reusable UI components
- Socket connection setup
- In-memory room management
- Placeholder game room for future Truth or Dare logic

## Project Structure

```text
FriendSpin/
├── backend/
│   ├── server.js
│   ├── roomManager.js
│   └── socket/
│       └── index.js
├── frontend/
│   ├── index.html
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── context/
│       ├── lib/
│       ├── pages/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── package.json
└── README.md
```

## Setup

```bash
npm install
```

## Run In Development

```bash
npm run dev
```

This starts:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Run Separately

```bash
npm run dev:frontend
npm run dev:backend
```

## Build Frontend

```bash
npm run build
```

## Notes

- Phase 1 uses in-memory rooms only. Restarting the backend clears room state.
- Phase 2 game rules, turns, prompts, and scoring should be added in the marked placeholders.
