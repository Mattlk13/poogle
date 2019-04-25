import * as request from 'supertest';
import App from '../../src/App';

describe('baseUrl', () => {

  it('should have a * CORS', async () => {
    const res = await request(App).get('/api')
    .expect('Access-Control-Allow-Origin', '*');
  });

  it('should be valid json', async () => {
    const res = await request(App).get('/api/');
    expect(res.type).toEqual('application/json');
  });

  it('should link to documentation', async () => {
    const res = await request(App).get('/api/');
    expect(res.body.message).toContain('check documentation');
    expect(res.body.documentation).toContain('https://fabienleite.github.io/emwas-doc/');
  });

});

describe('not existing ressource', () => {

  it('should get a 404', async () => {
    const res = await request(App).get('/api/riley-reid-is-bae');
    expect(res.status).toBe(404);
  });

  it('should return an error message and redirect to doc', async () => {
    const res = await request(App).get('/api/riley-reid-is-bae');
    expect(res.body.error).toContain('Whoops');
    expect(res.body.documentation).toBeDefined();
  });
});
