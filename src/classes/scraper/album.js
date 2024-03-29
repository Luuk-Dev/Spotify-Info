const ScrapedPlaylistTrack = require('./playlistTrack.js');

class ScrapedAlbum{
    constructor(data){
        this.id = data.albumId;
        this.name = data.albumName;
        this.artist = data.artist;
        this.artistId = data.artistId ? data.artistId : null;
        this.artistUrl = data.artistId ? `https://open.spotify.com/artist/${data.artistId}` : null;
        this.url = `https://open.spotify.com/album/${data.albumId}`;
        this.embedUrl = `https://open.spotify.com/embed/album/${data.albumId}`;
        this.publishDate = data.publishDate || null;
        this.locations = data.locations || [];
        this.description = data.description || null;

        this.thumbnail = data.thumbnail ? data.thumbnail : null;

        this.tracks = [];

        for(var i = 0; i < data.tracks.length; i++){
            let song = data.tracks[i];
            this.tracks.push(new ScrapedPlaylistTrack(song));
        }
    }
}

module.exports = ScrapedAlbum;
