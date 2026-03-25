/**
 * Fail fast if PORT (default 3000) is already bound — avoids Next silently switching
 * to 3001 while you still open http://localhost:3000 and see a stuck/old process.
 */
import net from 'node:net';

const port = Number(process.env.PORT || 3000);
if (!Number.isFinite(port) || port < 1 || port > 65535) {
  console.error('ensure-port-free: invalid PORT');
  process.exit(1);
}

const server = net.createServer();
server.once('error', (err) => {
  const code = /** @type {NodeJS.ErrnoException} */ (err).code;
  if (code === 'EADDRINUSE') {
    console.error(`\n[dev] Port ${port} is already in use.`);
    console.error(
      'Stop the other process (Task Manager) or run: npx kill-port ' + port,
    );
    console.error('Then run npm run dev again. To skip this check: npm run dev:force\n');
    process.exit(1);
  }
  throw err;
});

server.listen(port, '127.0.0.1', () => {
  server.close(() => process.exit(0));
});
