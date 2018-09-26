import * as mocha from 'mocha';

import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const lenaPaulSearch = '/search?q=Lena%20Paul';

describe('search', () => {

  it('should return a JSON object in HTTP 200', () => {
    return chai.request(App).get(lenaPaulSearch).then((res)  => {
      expect(res.status).to.eql(200);
      expect(res).to.be.json;
      expect(res).to.be.an('object');
    });
  });

  it('should find Lena Paul on Jules Jordan', () => {
    return chai.request(App).get(lenaPaulSearch).then((res)  => {
      expect(res).to.contain('Lena Paul');
    });
  });

});
