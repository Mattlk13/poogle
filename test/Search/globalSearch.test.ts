import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from '../../src/App';
import Video from '../../src/classes/Video';
import SearchOnJulesJordan from '../../src/search/SearchOnJulesJordan';

chai.use(chaiHttp);
const expect = chai.expect;
const lenaPaulSearch = '/search?q=Lena+Paul';

describe('search', () => {

  it('should return a JSON object in HTTP 200', async () => {
    const res = await chai.request(App).get(lenaPaulSearch);
    expect(res).to.be.json;
    expect(res).to.be.an('object');
  });

  const baseUrl = SearchOnJulesJordan.baseUrl;
  const searchPath = SearchOnJulesJordan.searchPath;
  const newSearch = new SearchOnJulesJordan();


  it('should URLize correctly', () => {
    expect(newSearch.translateToURL(lenaPaulSearch, baseUrl, searchPath)).to.be.a('URL');
    expect(newSearch.translateToURL(lenaPaulSearch, baseUrl, searchPath).href)
      .to
      .have
      .string('Lena+Paul');
  });

  it('should get a page with the text "Lena Paul" in it', async () => {
    const result = await newSearch.getHtml(
      newSearch.translateToURL(lenaPaulSearch, baseUrl, searchPath),
    );
    expect(result).to.contain('Lena Paul');
  });

  it('should find Lena Paul videos on Jules Jordan', async () => {
    const result = await chai.request(App).get(lenaPaulSearch);
    const titles: (string)[] = result.body.map((el: Video) => { return el.title; });
    expect(titles.length).to.be.greaterThan(0);
    expect(titles[0]).to.contain('Lena Paul');
  });

  /** I REALLY don't see how to test it, I could use some help on that */
  // it('shouldreturn HTTP 500 if Promise fails', async () => {
  // });


});
