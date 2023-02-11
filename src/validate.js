const { URL } = require('url');

function validateURL(url){
    try{
        return new URL(url);
    } catch {
        return false;
    }
}

function validateSpotifyURL(url){
    if(typeof url !== 'string') return false;
    const parsed = validateURL(url);
    if(parsed === false) return false;

    if(parsed.hostname.toLowerCase() !== "open.spotify.com") return false;

    return true;
}

function validateSongURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;

    const parsed = validateURL(url);

    if(!parsed.pathname.startsWith("/track/")) return false;

    const songId = parsed.pathname.split('/track/')[1].split('/')[0];

    if(!/^([a-zA-Z0-9]{20,30})$/.test(songId)) return false;

    return true;
}

function validateArtistURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;
    
    const parsed = validateURL(url);

    if(!parsed.pathname.startsWith("/artist/")) return false;

    const artistId = parsed.pathname.split('/artist/')[1].split('/')[0];

    if(!/^([a-zA-Z0-9]{20,30})$/.test(artistId)) return false;

    return true;
}

function validateAlbumURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;
    
    const parsed = validateURL(url);

    if(!parsed.pathname.startsWith("/album/")) return false;

    const albumId = parsed.pathname.split('/album/')[1].split('/')[0];

    if(!/^([a-zA-Z0-9]{20,30})$/.test(albumId)) return false;

    return true;
}

function validatePlaylistURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;
    
    const parsed = validateURL(url);

    if(!parsed.pathname.startsWith("/playlist/")) return false;

    const playlistId = parsed.pathname.split('/playlist/')[1].split('/')[0];

    if(!/^([a-zA-Z0-9]{20,30})$/.test(playlistId)) return false;

    return true;
}

module.exports = {validateSpotifyURL, validateSongURL, validateArtistURL, validateAlbumURL, validatePlaylistURL};
