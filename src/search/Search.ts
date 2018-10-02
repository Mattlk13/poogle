import * as axios from 'axios';

import Video from '../classes/Video';

/**
 * This the basic type that describes a Search from a global standpoint.
 * If you extend this class, you HAVE to redefine the following function :
 * parse()
 */
abstract class Search{

  public baseUrl: string;
  public searchPath: string;

  /* Essential high level functions */

  /**
   * Performs a search from a search to String to get a matching list of Videos.
   *  @param searchText the string the user wants to find
   */
  public async find(searchText: string): Promise<(Video)[]> {
    const searchUrl = this.translateToURL(searchText);
    const htmlRes = await this.getHtml(searchUrl);
    return this.parse(htmlRes);
  }

  /**
   * Gets the raw html result of a search from its URL.
   * @param searchUrl the url we want the html of
   */
  protected async getHtml(searchUrl: URL) : Promise<string> {
    // TODO: Do the shit.
    throw new Error('Method not implemented YET');
    return null;
  }

  /**
   * Transforms the raw html content of a search into a list of Videos.
   * THIS is the main method that cannot be defined because it is ultra specific to website
   * You HAVE to redfine this one on your extending class
   * @param textContent the textual content of the (html) web page
   */
  protected abstract async parse(textContent: string): Promise<(Video)[]>;


  /* Used functions */

  /**
   * Transforms an user search text into an url
   * @param searchText the string the user wants to find
   * @throws TypeError if search cannot be casted to a correct URL
   */
  protected translateToURL(searchText: string): URL {
    const reqOptionsUrlized = searchText.replace(' ', '+');
    return new URL(
      `${this.baseUrl}${this.searchPath}?x=0&y=0&query=${reqOptionsUrlized}`,
    );
  }

}

export default Search;
