import * as express from 'express';

const appRouter = express.Router();

appRouter.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World!',
  });
});

export { appRouter };
