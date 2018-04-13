import * as mocha from 'mocha';

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

  it('should say \'Hello Wold!\'', () => {
    return chai.request(App).get('/')
    .then((res) => {
      expect(res.body.message).to.contain('Hello World!');
    });
  });

});
