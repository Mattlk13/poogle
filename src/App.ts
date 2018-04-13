import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';

import * as router from './router';

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {

    const appRouter = router.appRouter;
    this.express.use('/', appRouter);
  }

}

export default new App().express;
