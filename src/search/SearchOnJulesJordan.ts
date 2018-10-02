import Search from './Search';
import Video from '../classes/Video';

class SearchOnJulesJordan extends Search {
  public baseUrl = 'https://www.julesjordan.com/';
  public searchPath = 'trial/search.php';

  protected async parse(textContent: string): Promise<(Video)[]> {
    throw new Error('Not implemented');
  }
}

export default SearchOnJulesJordan;
