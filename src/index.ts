/* tslint:disable:no-console */

import App from './App';

const port = normalizePort(process.env.PORT || 5000);
App.set('port', port);

App.listen(port as number, '0.0.0.0', () => {
  console.log(`Server started and ready - listening on port ${port}`);
});

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
