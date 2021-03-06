import * as cheerio from 'cheerio';
const { URL } = require('url');

import Search from './Search';
import Video from '../classes/Video';
import services from '../services';

class SearchOnJulesJordan extends Search {
  // go get interesting variables in the services file.
  private static service = services.filter((service) => {
    return service.name === 'Jules Jordan';
  })[0];

  public static baseUrl: string = SearchOnJulesJordan.service.baseUrl;
  public static searchPath: string = SearchOnJulesJordan.service.searchPath;

  public async parse(textContent: string): Promise<(Video)[]> {
    const $ = cheerio.load(textContent);
    const videos: Video[] = [];
    const videoElements = $('.category_listing_wrapper_updates');
    for (let i = 0 ; i < videoElements.length ; i += 1) {
      const currentVideoElement = videoElements.children().eq(i).children();

      const currentVideo: Video = new Video(
        SearchOnJulesJordan.service.id,
        this.findVideoTitle(currentVideoElement),
        this.findVideoURL(currentVideoElement),
        this.findVideoPerformers(currentVideoElement),
        this.findVideoThumbnailsURL(currentVideoElement),
        this.findVideoDescription(currentVideoElement),
        this.findVideoDate(currentVideoElement),
        this.findVideoLength(currentVideoElement),
      );

      videos.push(currentVideo);
    }
    return videos;
  }

  public findVideoTitle(videoElement: Cheerio): string {
    return videoElement.eq(2).text();
  }

  public findVideoURL(videoElement: Cheerio): URL {
    return new URL(videoElement.eq(2).attr('href'));
  }

  public findVideoThumbnailsURL(videoElement: Cheerio): URL[] {
    const thumbnails = videoElement.eq(0).children().eq(0);
    const nbrThmb = Number(thumbnails.attr('cnt'));

    if (nbrThmb > 1) {
      const thumbnailUrl: (URL)[] = [];
      for (let j = 0; j < nbrThmb ; j += 1) {
        const currentThmb = thumbnails.attr(
          (j === 1 ? 'src' : `src${j}_1x`),
        );
        thumbnailUrl.push(new URL(currentThmb));
      }
      return thumbnailUrl;
    }
    return [new URL(thumbnails.attr('src'))];

  }

  public findVideoPerformers(videoElement: Cheerio): string[] {
    const performers: (string)[] = [];
    // use of the function keyword for the anonymous function to keep context
    const performersElement = videoElement.eq(4).children();
    for (let i = 0 ; i < performersElement.length ; i += 1) {
      performers.push(performersElement.eq(i).text());
    }
    return performers;
  }

  public findVideoDescription(videoElement: Cheerio): string {
    return videoElement.eq(2).attr('title');
  }

  public findVideoDate(videoElement: Cheerio): Date {
    return new Date(
      videoElement.eq(6).children().eq(0).children().eq(0).text()
        .trim(),
    );

  }

  public findVideoLength(videoElement: Cheerio): number {
    let videoLength: number = 0;
    const videoLengthAndOtherInfos: string = videoElement.eq(5).text();
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
    return videoLength;
  }

}

export default SearchOnJulesJordan;
