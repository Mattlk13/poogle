import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseUrl', () => {

  it('should be valid json', () => {
    return (
      chai.request(App).get('/')
      .then((res) => {
        expect(res.type).to.eql('application/json');
      })
    );
  });

  it('should link to documentation', () => {
    return chai.request(App).get('/')
    .then((res) => {
      expect(res.body.message).to.contain('check documentation');
      expect(res.body.documentation).to.contain('https://fabienleite.github.io/emwas-doc/');
    });
  });

});

describe('not existing ressource', () => {
  it('should get a 404', () => {
    return chai.request(App).get('/riley-reid-is-bae')
    .then((res) => {
      expect(res).to.have.status(404);
    });
  });

  it('should return an error message and redirect to doc', () => {
    return chai.request(App).get('/riley-reid-is-bae')
    .then((res) => {
      expect(res.body.error).to.contain('Whoops');
      expect(res.body.documentation).to.exist;
    });
  });
});
