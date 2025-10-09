QuickCast Backend
=================

This folder contains the backend for QuickCast. The codebase was slightly reorganized to follow a conventional layout while remaining fully compatible with the original entrypoint (`index.js`).

Layout
------

- `index.js` - lightweight bootstrap that starts the server (keeps existing scripts working).
- `src/`
  - `config/` - configuration helpers (database connection, etc.)
  - `app.js` - configures the Express app and mounts routers
  - `server.js` - prepares HTTP server, socket.io and starts listening
- `models/`, `routers/`, `sockets/`, `middleware/` - existing code kept in place

How to run
----------

Development (existing behavior):

1. Ensure `.env` has the required variables (e.g. `MONGODB_URI`, `PORT`).
2. Run `npm run dev` (this runs `nodemon index`).

Alternate development (watch new src files):

1. Run `npm run dev:src` to watch `src/` and restart automatically.

Production:

1. `npm run build` if needed by your deployment.
2. `npm start` (runs `node index`).

Notes
-----
The reorganization is intentionally non-breaking: `index.js` still works as before, but most of the setup now lives under `src/` for better maintainability.
