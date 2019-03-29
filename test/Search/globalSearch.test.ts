import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');

import App from '../../src/App';
import Video from '../../src/classes/Video';
import Search from '../../src/search/Search';
import SearchOnJulesJordan from '../../src/search/SearchOnJulesJordan';

chai.use(chaiHttp);
const expect = chai.expect;
const lenaPaulSearch = '/search?q=Lena+Paul';
const nataliaStarrSearch = '/search?q=Natalia+Starr';

describe('search', () => {

  it('should return a JSON object in HTTP 200', async () => {
    const res = await chai.request(App).get(lenaPaulSearch);
    expect(res).to.be.json;
    expect(res).to.be.an('object');
  });

  it('should return HTTP 500 if a Promise fails', async () => {
    sinon.replace(Search.prototype, 'getHtml', () => {
      return Promise.reject();
    });
    const res = await chai.request(App).get(lenaPaulSearch);
    expect(res).to.be.json;
    expect(res.status).to.equal(500);
    expect(res.body.error.toUpperCase()).to.contain('SERVER ERROR');
    sinon.restore();
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

    // titles
    const titles: (string)[] = result.body.map((el: Video) => { return el.title; });
    expect(titles.length).to.be.greaterThan(0);
    expect(titles[0]).to.contain('Lena Paul');

    // URLs
    expect(new URL(result.body[0].url)).to.be.an.instanceOf(URL); // means it instanciates well

    const thumbnailNumber = result.body[0].thumbnailUrl.length;
    expect(thumbnailNumber).to.be.greaterThan(0);
    expect(new URL(result.body[0].thumbnailUrl[thumbnailNumber - 1])).to.be.an.instanceOf(URL);

    // performers
    const performerNumber = result.body[0].performers.length;
    expect(performerNumber).to.be.greaterThan(0);
    expect(result.body[0].performers[performerNumber - 1]).to.be.a('string');

    // description
    expect(result.body[0].description).to.be.a('string');
    expect(result.body[0].description).to.contain('Lena Paul');
    expect(result.body[1].description).to.contain('Lena Paul');
    expect(result.body[0].description.length).to.be.greaterThan(
      result.body[0].title.length,
    );

    // date
    const firstVideoDate = new Date(result.body[0].date);
    const secondVideoDate = new Date(result.body[1].date);
    expect(firstVideoDate).to.be.an.instanceOf(Date);
    expect(secondVideoDate).to.be.an.instanceOf(Date);
    expect(firstVideoDate).to.be.greaterThan(secondVideoDate);

    // length
    const firstVideoLength = result.body[0].length;
    expect(firstVideoLength).to.be.a('number');
    expect(firstVideoLength).to.be.greaterThan(60 * 5); // greater than 5 minutes

  });

  it('Should handle correctly multiple thumbnails', async () => {
    const result = await chai.request(App).get(nataliaStarrSearch);

    const thumbnailNumber = result.body[0].thumbnailUrl.length;
    expect(thumbnailNumber).to.be.greaterThan(1);
    expect(new URL(result.body[0].thumbnailUrl[thumbnailNumber - 1])).to.be.an.instanceOf(URL);
  });

});
