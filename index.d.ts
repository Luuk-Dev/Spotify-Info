export interface ScrapedSong{
    title: string;
    artist: string;
    artistUrl: string;
    artistId: string;
    description: string;
    publishDate: string;
    locations: [string];
    url: string;
    embedUrl: string;
}

export interface ScrapedPlaylistSong{
    name: string;
    artist: string;
    duration: number;
    durationString: string;
}

export interface ScrapedPlaylist{
    id: string;
    name: string;
    creator: string;
    creatorId: string;
    creatorUrl: string;
    thumbnail: string;
    locations: [string];
    description: string;
    url: string;
    embedUrl: string;
    songs: [ScrapedPlaylistSong]
}

export interface ScrapedAlbum{
    id: string;
    name: string;
    artist: string;
    artistId: string;
    artistUrl: string;
    thumbnail: string;
    locations: [string];
    publishDate: string;
    description: string;
    url: string;
    embedUrl: string;
    songs: [ScrapedPlaylistSong];
}

/**
 * Get information about an album by scraping the page
 * @param songUrl The url of the album you want to get the information of
 * @example
 * spotifyInfo.scrapeAlbum('https://open.spotify.com/album/5Z9iiGl2FcIfa3BMiv6OIw').then(album => console.log(album.name)).catch(console.log);
 */
export function scrapeAlbum(albumUrl: string) : Promise<ScrapedAlbum>;

/**
 * Get information about a playlist by scraping the page
 * @param playlistUrl The url of the playlist you want to get the information of
 * @example
 * spotifyInfo.scrapePlaylist('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE').then(playlist => console.log(playlist.name)).catch(console.log);
 */
export function scrapePlaylist(playlistUrl: string) : Promise<ScrapedPlaylist>;

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
