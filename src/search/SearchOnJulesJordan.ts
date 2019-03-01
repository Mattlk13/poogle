import * as cheerio from 'cheerio';

import Search from './Search';
import Video from '../classes/Video';

class SearchOnJulesJordan extends Search {
  public static baseUrl: string = 'https://www.julesjordan.com/';
  public static searchPath: string = 'trial/search.php';

  public async parse(textContent: string): Promise<(Video)[]> {
    const $ = cheerio.load(textContent);
    const videos: Video[] = [];
    const videoElements = $('.category_listing_wrapper_updates');
    for (let i = 0 ; i < videoElements.length ; i += 1) {
      const currentVideo: Video = new Video();
      currentVideo.title = videoElements.children().eq(i).children().eq(2).text();

      videos.push(currentVideo);
    }
    return videos;
  }
}

export default SearchOnJulesJordan;
