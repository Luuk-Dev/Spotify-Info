export interface ScrapedSong{
    title: string;
    artist: string;
    description: string;
    publishDate: string;
    locations: [string];
    url: string;
}

/**
 * Get information about a song by scraping the page
 * @param songUrl The url of the song you want to get the information of
 * @example
 * spotifyInfo.scrapeSong('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT').then(song => console.log(song.name)).catch(console.log);
 */
export function scrapeSong(songUrl: string) : Promise<ScrapedSong>;

/**
 * Check if a url is a Spotify url
 * @param url The url you would like to validate
 * @example 
 * spotifyInfo.validateSpotifyURL('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT'); // returns true
 */
export function validateSpotifyURL(url: string) : boolean;

/**
 * Check if a url is a Spotify song url
 * @param url The url you would like to validate
 * @example 
 * spotifyInfo.validateSongURL('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT'); // returns true
 */
export function validateSongURL(url: string) : boolean;

/**
 * Check if a url is a Spotify artist url
 * @param url The url you would like to validate
 * @example 
 * spotifyInfo.validateArtistURL('https://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt'); // returns true
 */
export function validateArtistURL(url: string) : boolean;

/**
 * Check if a url is a Spotify album url
 * @param url The url you would like to validate
 * @example 
 * spotifyInfo.validateAlbumURL('https://open.spotify.com/album/5Z9iiGl2FcIfa3BMiv6OIw'); // returns true
 */
export function validateAlbumURL(url: string) : boolean;

/**
 * Check if a url is a Spotify playlist url
 * @param url The url you would like to validate
 * @example 
 * spotifyInfo.validatePlaylistURL('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE'); // returns true
 */
export function validatePlaylistURL(url: string) : boolean;
