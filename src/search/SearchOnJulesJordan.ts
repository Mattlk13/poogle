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

      // title
      currentVideo.title = videoElements.children().eq(i).children().eq(2).text();

      // URLs
      currentVideo.url = new URL(videoElements.children().eq(i).children().eq(2).attr('href'));
      currentVideo.thumbnailUrl = [];
      const nbrThmb = Number(
        videoElements.children().eq(i).children().eq(0).children().eq(0).attr('cnt'),
      );
      for (let i = 0; i < nbrThmb ; i += 1) {
        const currentThmb = videoElements.children().eq(i).children().eq(0).children().eq(0).attr(
          `src${i}_1x`,
        );

        if (typeof currentThmb !== 'undefined') {
          const currentThmbAsUrl = new URL(currentThmb);
          currentVideo.thumbnailUrl.push(currentThmbAsUrl);
        }
      }

      // performers
      currentVideo.performers = [];
      // use of the function keyword for the anonymous function to keep context
      videoElements.children().eq(i).children().eq(4).children().each(function () {
        currentVideo.performers.push($(this).text());
      });

      videos.push(currentVideo);
    }
    return videos;
  }
}

export default SearchOnJulesJordan;
