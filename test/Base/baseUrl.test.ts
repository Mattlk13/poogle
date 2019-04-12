import * as request from 'supertest';
import App from '../../src/App';

describe('baseUrl', () => {

  it('should be valid json', () => {
    return request(App).get('/')
    .then((res) => {
      expect(res.type).toEqual('application/json');
    });
  });

  it('should link to documentation', () => {
    return request(App).get('/')
    .then((res) => {
      expect(res.body.message).toEqual(expect.stringContaining('check documentation'));
      expect(res.body.documentation).toEqual(
        expect.stringContaining('https://fabienleite.github.io/emwas-doc/'),
      );
    });
  });

});

describe('not existing ressource', () => {

  it('should get a 404', () => {
    return request(App).get('/riley-reid-is-bae')
    .then((res) => {
      expect(res.status).toBe(404);
    });
  });

  it('should return an error message and redirect to doc', () => {
    return request(App).get('/riley-reid-is-bae')
    .then((res) => {
      expect(res.body.error).toEqual(expect.stringContaining('Whoops'));
      expect(res.body.documentation).toBeDefined();
    });
  });
});
