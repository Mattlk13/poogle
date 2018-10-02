import * as express from 'express';

import Search from './search/Search';
import SearchOnJulesJordan from './search/SearchOnJulesJordan';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

appRouter.get('/search', (req, res) => {
  res.json(Promise.resolve(SearchOnJulesJordan.prototype.find(req.query)));
});

export { appRouter };
