import * as express from 'express';

import Video from './classes/Video';
import SearchOnJulesJordan from './search/SearchOnJulesJordan';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello, this is the emwas API, please check documentation for more information',
    documentation: 'https://fabienleite.github.io/emwas-doc/',
  });
});

appRouter.get('/search', async (req, res) => {
  const baseUrl: string = SearchOnJulesJordan.baseUrl;
  const searchPath: string = SearchOnJulesJordan.searchPath;
  try {
    const searchRes: (Video)[] = await SearchOnJulesJordan.prototype.find(
      req.query.q, baseUrl, searchPath,
    );
    res.json(searchRes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error on getting results from Jules Jordan' });
  }
});

// default 404
appRouter.get('*', async (req, res) => {
  res.status(404).json({
    error: 'Whoops ! This is a 404, are you sure this is the URL you\'re looking for ?',
    documentation: 'https://fabienleite.github.io/emwas-doc/',
  });
});

export { appRouter };
