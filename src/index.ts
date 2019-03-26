/* tslint:disable:no-console */

import * as http from 'http';

import App from './App';

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number|string): number|string|boolean {
  const httpPort: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(httpPort)) {
    return val;
  }
  if (httpPort >= 0) {
    return httpPort;
  }
  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  let bind = '(not able to detect port)';
  if (addr != null && addr !== undefined) {
    bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  }
  console.log(`Listening on ${bind}`);
}
