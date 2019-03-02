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
      const currentVideoElement = videoElements.children().eq(i).children();

      // title
      currentVideo.title = currentVideoElement.eq(2).text();

      // URLs
      currentVideo.url = new URL(currentVideoElement.eq(2).attr('href'));
      const thumbnails = currentVideoElement.eq(0).children().eq(0);
      currentVideo.thumbnailUrl = [];
      const nbrThmb = Number(
        thumbnails.attr('cnt'),
      );

      if (nbrThmb > 1) {
        for (let j = 0; j < nbrThmb ; j += 1) {
          const currentThmb = thumbnails.attr(
            (j === 1 ? 'src' : `src${j}_1x`),
          );
          if (typeof currentThmb !== 'undefined') {
            const currentThmbAsUrl = new URL(currentThmb);
            currentVideo.thumbnailUrl.push(currentThmbAsUrl);
          }
        }
      } else {
        currentVideo.thumbnailUrl.push(
          new URL(thumbnails.attr('src')),
        );
      }

      // performers
      currentVideo.performers = [];
      // use of the function keyword for the anonymous function to keep context
      currentVideoElement.eq(4).children().each(function () {
        currentVideo.performers.push($(this).text());
      });

      // description
      currentVideo.description = currentVideoElement.eq(2).attr('title');

      // date
      currentVideo.date = new Date(
        currentVideoElement.eq(6).children().eq(0).children().eq(0).text()
          .trim(),
      );

      // length
      let videoLength: number;
      const videoLengthAndOtherInfos: string = currentVideoElement.eq(5).text();
      const commaPosition: number = videoLengthAndOtherInfos.indexOf(',') + 1;
      const minWordPosition: number = videoLengthAndOtherInfos.indexOf('min');
      if (commaPosition && commaPosition > 0 && minWordPosition && minWordPosition > 0) {
        videoLength = Number(videoLengthAndOtherInfos.substr(
            commaPosition,
            minWordPosition - commaPosition,
          ),
        ); // get video length in minutes
        videoLength *= 60 ; // convert in seconds
      }
      currentVideo.length = videoLength;

      videos.push(currentVideo);
    }
    return videos;
  }
}

export default SearchOnJulesJordan;
