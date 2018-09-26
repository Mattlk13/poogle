import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cheerio from 'cheerio';

import Video from '../classes/Video';

class Search{

  /**
   * Transforms an user search text into an url
   * @param searchText the string the user wants to find
   */
  private translateToURL(searchText: string) : URL {
    const reqOptionsUrlized = searchText.replace(' ', '+');
    return new URL(
      `https://www.julesjordan.com/trial/search.php?x=0&y=0&query=${reqOptionsUrlized}`,
    );
  }

  /**
   * Gets the raw html result of a search from its URL.
   * @param searchUrl the url we want the html of
   */
  private async getHtml(searchUrl: URL) : Promise<string> {
    return null;
  }

  /**
   * Transforms the raw html content of a search into a list of Videos.
   * @param textContent the textual content of the (html) web page
   */
  private async parse(textContent: string) : Promise<(Video)[]> {
    return null;
  }

  /**
   * Performs a search from a search to String to get a matching list of Videos.
   *  @param searchText the string the user wants to find
   */
  public async find(searchText: string): Promise<(Video)[]> {
    const searchUrl = this.translateToURL(searchText);
    const htmlRes = await this.getHtml(searchUrl);
    return this.parse(htmlRes);
  }

}

export default new Search();
