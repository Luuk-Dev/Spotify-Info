export interface ScrapedTrack{
    name: string;
    artist: string;
    artistUrl: string;
    artistId: string;
    description: string;
    publishDate: string;
    locations: [string];
    url: string;
    embedUrl: string;
}

export interface ScrapedPlaylistTrack{
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
    tracks: [ScrapedPlaylistTrack]
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
    tracks: [ScrapedPlaylistTrack];
}

export interface ApiTrack{
    name: string;
    locations: [string];
    url: string;
    embedUrl: string;
    id: number;
    discNumber: number;
    trackNumber: number;
    explicit: boolean;
    album: {
        name: string,
        images: [{
            height?: number,
            width?: number,
            url: string
        }],
        id: string,
        release: string,
        totalTracks: number,
        type: 'album' | 'single' | 'compilation',
        url: string,
        locations: [string],
        artists: [{
            name: string,
            url: string,
            id: string
        }],
        uri: string
    } | null;
    artists: [{
        name: string,
        url: string,
        id: string,
        uri: string
    }];
    uri: string;
    duration: number;
    popularity: number;
    previewUrl: string | null;
}

export interface ApiAlbum{
    type: 'album' | 'single' | 'compilation';
    name: string;
    totalTracks: number;
    locations: [string];
    url: string;
    embedUrl: string;
    id: string;
    images: [{
        height?: number,
        width?: number,
        url: string
    }]
    release: string;
    uri: string;
    copyrights: [string];
    genres: [string];
    label: string | null;
    artists: [{
        name: string,
        id: string,
        url: string,
        uri: string
    }];
    popularity: number | null;
    tracks: [{
        name: string,
        url: string,
        id: string,
        embedUrl: string,
        location: [string],
        previewUrl: string | null,
        explicit: boolean,
        duration: number,
        discNumber: number,
        trackNumber: number,
        uri: string,
        artists: [{
            name: string,
            url: string,
            id: string,
            uri: string
        }]
    }];
}

export interface SearchAlbum{
    type: 'album' | 'single' | 'compilation';
    name: string;
    totalTracks: number;
    locations: [string];
    url: string;
    embedUrl: string;
    id: string;
    images: [{
        height?: number,
        width?: number,
        url: string
    }]
    release: string;
    uri: string;
    copyrights: [string];
    genres: [string];
    label: string | null;
    artists: [{
        name: string,
        id: string,
        url: string,
        uri: string
    }];
    getTracks: (options: ApiOptions) => Promise<[{
        name: string,
        url: string,
        id: string,
        embedUrl: string,
        location: [string],
        previewUrl: string | null,
        explicit: boolean,
        duration: number,
        discNumber: number,
        trackNumber: number,
        uri: string,
        artists: [{
            name: string,
            url: string,
            id: string,
            uri: string
        }]
    }]>;
}

export interface ApiPlaylist{
    name: string;
    collaborative: boolean;
    url: string;
    embedUrl: string;
    followers: number;
    id: string;
    images: [{
        height?: number,
        width?: number,
        url: string
    }];
    owner: {
        id: string,
        name: string,
        url: string,
        uri: string
    };
    public: boolean;
    description?: string;
    tracks: [{
        addedTimestamp: number,
        name: string,
        url: string,
        id: string,
        embedUrl: string,
        release: string,
        location: [string],
        previewUrl: string | null,
        explicit: boolean,
        duration: number,
        discNumber: number,
        trackNumber: number,
        uri: string,
        artists: [{
            name: string,
            url: string,
            id: string,
            uri: string
        }],
        album: {
            type: string,
            totalTracks: number,
            url: string,
            id: string,
            images: [{
                height?: number,
                width?: number,
                url: string
            }],
            name: string,
            release: string,
            locations: [string],
            uri: string,
            artists: [{
                name: string,
                url: string,
                id: string,
                uri: string
            }],
        }
    }];
}

export interface SearchPlaylist{
    name: string;
    collaborative: boolean;
    url: string;
    embedUrl: string;
    id: number;
    uri: string;
    images: [{
        height?: number,
        width?: number,
        url: string
    }];
    owner: {
        id: string,
        name: string,
        url: string,
        uri: string
    };
    public?: boolean;
    description?: string;
    getTracks: (options: ApiOptions) => Promise<[{
        addedTimestamp: number,
        name: string,
        url: string,
        id: string,
        release: string,
        location: [string],
        previewUrl: string | null,
        explicit: boolean,
        duration: number,
        discNumber: number,
        trackNumber: number,
        uri: string,
        artists: [{
            name: string,
            url: string,
            id: string,
            uri: string
        }],
        album: {
            type: string,
            url: string,
            id: string,
            images: [{
                height?: number,
                width?: number,
                url: string
            }],
            name: string,
            release: string,
            locations: [string],
            uri: string
        }
    }]>;
}

export interface ApiArtist{
    name: string;
    id: string;
    url: string;
    embedUrl: string;
    uri: string;
    followers: number;
    genres: [string];
    images: [{
        height?: number,
        width?: number,
        url: string
    }];
    popularity?: number;
}

export interface SearchResult{
    tracks: {
        limit: number,
        offset: number,
        total: number,
        nextPage: () => Promise<searchResult>,
        previousPage: () => Promise<searchResult>,
        items: [ApiTrack]
    },
    albums: {
        limit: number,
        offset: number,
        total: number,
        nextPage: () => Promise<searchResult>,
        previousPage: () => Promise<searchResult>,
        items: [SearchAlbum]
    },
    playlists: {
        limit: number,
        offset: number,
        total: number,
        nextPage: () => Promise<searchResult>,
        previousPage: () => Promise<searchResult>,
        items: [SearchPlaylist]
    }
    artists: {
        limit: number,
        offset: number,
        total: number,
        nextPage: () => Promise<searchResult>,
        previousPage: () => Promise<searchResult>,
        items: [ApiArtist]
    }
}

type ApiOptions = {
    market?: string
}

type searchOptions = {
    type?: ['track' | 'playlist' | 'album' | 'artist'],
    market?: string,
    offset?: number,
    limit?: number
}

/**
 * Get information about an album by scraping the page
 * @param trackUrl The url of the album you want to get the information of
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
 * Get information about a track by scraping the page
 * @param trackUrl The url of the track you want to get the information of
 * @example
 * spotifyInfo.scrapeTrack('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT').then(track => console.log(track.name)).catch(console.log);
 */
export function scrapeTrack(trackUrl: string) : Promise<ScrapedTrack>;

/**
 * Check if a url is a Spotify url
 * @param url The url you would like to validate
 * @example 
 * spotifyInfo.validateSpotifyURL('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT'); // returns true
 */
export function validateSpotifyURL(url: string) : boolean;

/**
 * Checks whether the ID is a valid ID
 * @param id The ID you want to validate
 * @example
 * spotifyInfo.validateID('4cOdK2wGLETKBW3PvgPWqT'); // returns true
 */
export function validateID(id: string) : boolean;

/**
 * Check if a url is a Spotify track url
 * @param url The url you would like to validate
 * @example 
 * spotifyInfo.validateTrackURL('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT'); // returns true
 */
export function validateTrackURL(url: string) : boolean;

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

/**
 * Get the ID of a track, artist, playlist or album url
 * @param url The url of the track, artist, playlist or album where you want to get the ID of
 * @example
 * spotifyInfo.getID('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT'); // returns '4cOdK2wGLETKBW3PvgPWqT'
 */
export function getID(url: string) : string | boolean;

/**
 * Sets the api credentials to be able to use the Spotify API
 * @param clientId The client id of your application
 * @param clientSecret The client secret of your application
 * @example
 * spotifyInfo.setApiCredentials('Your-Client-Id', 'Your-Client-Secret');
 */
export function setApiCredentials(clientId: string, clientSecret: string) : void;

/**
 * Get information about a track by using the Spotify API
 * @param url The url or the track id of the track
 * @param options Additional options
 * @example
 * spotifyInfo.getTrack('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT').then(track => console.log(track.name)).catch(console.log);
 */
export function getTrack(url: string, options?: ApiOptions) : Promise<ApiTrack>;


/**
 * Get information about an album by using the Spotify API
 * @param url The url or the album id of the album
 * @param options Additional options
 * @example
 * spotifyInfo.getAlbum('https://open.spotify.com/album/5Z9iiGl2FcIfa3BMiv6OIw').then(album => console.log(album.name)).catch(console.log);
 */
export function getAlbum(url: string, options?: ApiOptions) : Promise<ApiAlbum>;


/**
 * Get information about a playlist by using the Spotify API
 * @param url The url or the playlist id of the playlist
 * @param options Additional options
 * @example
 * spotifyInfo.getPlaylist('https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF').then(album => console.log(album.name)).catch(console.log);
 */
export function getPlaylist(url: string, options?: ApiOptions) : Promise<ApiPlaylist>;


/**
 * Get information about an artist by using the Spotify API
 * @param url The url or the artist id of the artist
 * @param options Additional options
 * @example
 * spotifyInfo.getArtist('https://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt').then(artist => console.log(artist.name)).catch(console.log);
 */
export function getArtist(url: string) : Promise<ApiArtist>;

/**
 * Search a track, playlist, album or artist
 * @param query The query you want to use
 * @param options Additional options
 * @example
 * spotifyInfo.search('Never gonna give you up', {type: ['track']})
 */
export function search(query: string, options?: searchOptions) : Promise<SearchResult>;
