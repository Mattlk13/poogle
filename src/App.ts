import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import * as router from './router';

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.express.disable('x-powered-by');
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use('/api/', router.appRouter);
  }

}

export default new App().express;
