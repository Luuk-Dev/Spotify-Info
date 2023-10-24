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

    if(parsed.hostname.toLowerCase() !== "open.spotify.com" && parsed.hostname.toLowerCase() !== "api.spotify.com") return false;

    return true;
}

function validateID(id){
    if(!/^([a-zA-Z0-9]{1,30})$/.test(id)) return false;
    
    return true;
}

function validateTrackURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;

    const parsed = validateURL(url);

    let reg = new RegExp('/(.+)/(track|embed/track|v1/tracks)/([a-zA-Z0-9]{10,30})');
    if(!reg.test(parsed.pathname)) return false;

    const trackId = (parsed.pathname.split('/track/')[1] || parsed.pathname.split('/v1/tracks/')[1] || '').split('/')[0];

    return validateID(trackId);
}

function validateArtistURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;
    
    const parsed = validateURL(url);

    let reg = new RegExp('/(.+)/(artist|embed/artist|v1/artists)/([a-zA-Z0-9]{10,30})');
    if(!reg.test(parsed.pathname)) return false;

    const artistId = (parsed.pathname.split('/artist/')[1] || parsed.pathname.split('/v1/artists/')[1] || '').split('/')[0];

    return validateID(artistId);
}

function validateAlbumURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;
    
    const parsed = validateURL(url);

    let reg = new RegExp('/(.+)/(album|embed/album|v1/albums)/([a-zA-Z0-9]{10,30})');
    if(!reg.test(parsed.pathname)) return false;

    const albumId = (parsed.pathname.split('/album/')[1] || parsed.pathname.split('/v1/albums/')[1] || '').split('/')[0];

    return validateID(albumId);
}

function validatePlaylistURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;
    
    const parsed = validateURL(url);

    let reg = new RegExp('/(.+)/(playlist|embed/playlist|v1/playlists)/([a-zA-Z0-9]{10,30})');
    if(!reg.test(parsed.pathname)) return false;

    const playlistId = (parsed.pathname.split('/playlist/')[1] || parsed.pathname.split('/v1/playlists/')[1] || '').split('/')[0];

    return validateID(playlistId);
}

function validateUserURL(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;
    
    const parsed = validateURL(url);

    let reg = new RegExp('/(.+)/(user|v1/users)/([a-zA-Z0-9]{10,30})');
    if(!reg.test(parsed.pathname)) return false;

    const userId = (parsed.pathname.split('/user/')[1] || parsed.pathname.split('/v1/users/')[1] || '').split('/')[0];

    return validateID(userId);
}

function getID(url){
    const spotifyURL = validateSpotifyURL(url);
    if(!spotifyURL) return false;

    const parsed = validateURL(url);
    let id = undefined;
    if(validateTrackURL(url)) id = (parsed.pathname.split('/track/')[1] || parsed.pathname.split('/v1/tracks/')[1] || '').split('/')[0];
    else if(validateArtistURL(url)) id = (parsed.pathname.split('/artist/')[1] || parsed.pathname.split('/v1/artists/')[1] || '').split('/')[0];
    else if(validatePlaylistURL(url)) id = (parsed.pathname.split('/playlist/')[1] || parsed.pathname.split('/v1/playlists/')[1] || '').split('/')[0];
    else if(validateAlbumURL(url)) id = (parsed.pathname.split('/album/')[1] || parsed.pathname.split('/v1/albums/')[1] || '').split('/')[0];
	else if(validateUserURL(url)) id = (parsed.pathname.split('/user/')[1] || parsed.pathname.split('/v1/users/')[1] || '').split('/')[0];

    return id;
}

module.exports = {validateSpotifyURL, validateID, validateTrackURL, validateArtistURL, validateAlbumURL, validatePlaylistURL, validateUserURL, getID};
