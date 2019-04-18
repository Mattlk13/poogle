import * as request from 'supertest';

import App from '../../src/App';
import Video from '../../src/classes/Video';
import * as Search from '../../src/search/Search';
import SearchOnJulesJordan from '../../src/search/SearchOnJulesJordan';

const lenaPaulSearch = '/search?q=Lena+Paul';
const nataliaStarrSearch = '/search?q=Natalia+Starr';

describe('search HTTP status', () => {

  it('should return a JSON object in HTTP 200', async () => {
    const res = await request(App).get(lenaPaulSearch);
    expect(res.type).toEqual('application/json');
  });

  it('should return HTTP 500 if a Promise fails', async () => {
    jest.spyOn(Search.default.prototype, 'getHtml').mockImplementationOnce(() => {
      return Promise.reject();
    });

    const res = await request(App).get(lenaPaulSearch);
    expect(res.type).toEqual('application/json');
    expect(res.status).toBe(500);
    expect(res.body.error.toUpperCase()).toContain('SERVER ERROR');

    jest.restoreAllMocks();
  });
});

describe('search functionnalities', () => {

  const baseUrl = SearchOnJulesJordan.baseUrl;
  const searchPath = SearchOnJulesJordan.searchPath;
  const newSearch = new SearchOnJulesJordan();

  it('should URLize correctly', () => {
    expect(newSearch.translateToURL(lenaPaulSearch, baseUrl, searchPath).href)
      .toEqual(expect.stringContaining('Lena+Paul'));
  });

  it('should get a page with the text "Lena Paul" in it', async () => {
    const result = await newSearch.getHtml(
      newSearch.translateToURL(lenaPaulSearch, baseUrl, searchPath),
    );
    expect(result).toContain('Lena Paul');
  });

  it('should find Lena Paul videos on Jules Jordan', async () => {
    const result = await request(App).get(lenaPaulSearch);

    // titles
    const titles: (string)[] = result.body.map((el: Video) => { return el.title; });
    expect(titles.length).toBeGreaterThan(0);
    expect(titles[0]).toEqual(expect.stringContaining('Lena Paul'));

    // URLs
    expect(new URL(result.body[0].url)).toBeInstanceOf(URL); // means it instanciates well

    const thumbnailNumber = result.body[0].thumbnailUrl.length;
    expect(thumbnailNumber).toBeGreaterThan(0);
    expect(new URL(result.body[0].thumbnailUrl[thumbnailNumber - 1])).toBeInstanceOf(URL);

    // performers
    const performerNumber = result.body[0].performers.length;
    expect(performerNumber).toBeGreaterThan(0);
    expect(result.body[0].performers[performerNumber - 1].split(' ').length).toBe(2);
    // first name + last name

    // description
    expect(result.body[0].description).toEqual(expect.stringContaining('Lena Paul'));
    expect(result.body[1].description).toEqual(expect.stringContaining('Lena Paul'));
    expect(result.body[0].description.length).toBeGreaterThan(result.body[0].title.length);

    // date
    const firstVideoDate = new Date(result.body[0].date);
    const secondVideoDate = new Date(result.body[1].date);
    expect(firstVideoDate).toBeInstanceOf(Date);
    expect(secondVideoDate).toBeInstanceOf(Date);
    expect(firstVideoDate.getTime()).toBeGreaterThan(secondVideoDate.getTime());

    // length
    const firstVideoLength = result.body[0].length;
    expect(firstVideoLength).toBeGreaterThan(60 * 5); // greater than 5 minutes

  });

  it('Should handle correctly multiple thumbnails', async () => {
    const result = await request(App).get(nataliaStarrSearch);

    const thumbnailNumber = result.body[0].thumbnailUrl.length;
    expect(thumbnailNumber).toBeGreaterThan(1);
    expect(new URL(result.body[0].thumbnailUrl[thumbnailNumber - 1])).toBeInstanceOf(URL);
  });

});
