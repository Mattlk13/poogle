import * as request from 'supertest';

import App from '../../src/App';

describe('services are listed', () => {
  it('should list Jules Jordan Service', async () => {
    const getServices = await request(App).get('/api/services');
    expect(getServices.body[0]).toEqual({
      id: 1,
      name: 'Jules Jordan',
      baseUrl: 'https://www.julesjordan.com/',
      searchPath: 'trial/search.php',
    });
  });
});
