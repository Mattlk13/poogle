import * as express from 'express';
import * as search from './search/Search';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

appRouter.get('/search', (req, res) => {
  res.json(search.find(req));
});

export { appRouter };
