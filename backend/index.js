/**
 * Lightweight bootstrapper. The real server lives under src/ for better structure.
 */
const startServer = require('./src/server');

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
