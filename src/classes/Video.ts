class Video {

  /**
   * The id of the service (website) the video has been found on.
   */
  service: number;

  /**
   * The title of the video.
   */
  title: string;

  /**
   * The url of the video.
   */
  url: URL;

  /**
   * The list of the performers (M & F if given by original website) in the scene.
   */
  performers: (string)[];

  /**
   * The list of URL for the thumbnails. If only one, it's still an array.
   */
  thumbnailUrl: (URL)[];

  /**
   * The description of the scene given by original website
   */
  description: string;

  /**
   * The upload date of the video
   */
  date: Date;

  /**
   * The length of the video, in minutes. It's a float.
   */
  length: number;

  /**
   * A list of tags associated with the video.
   * Some services doesn't include any on their website.
   */
  tags: (string)[];

}

export default Video;
