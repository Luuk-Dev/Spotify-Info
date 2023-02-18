const ScrapedPlaylistSong = require('./playlistSong.js');

class ScrapedAlbum{
    constructor(data){
        this.id = data.albumId;
        this.name = data.albumName;
        this.artist = data.artist;
        this.url = `https://open.spotify.com/album/${data.albumId}`;
        this.embedUrl = `https://open.spotify.com/embed/album/${data.albumId}`;

        this.songs = [];

        for(var i = 0; i < data.songs.length; i++){
            let song = data.songs[i];
            this.songs.push(new ScrapedPlaylistSong(song));
        }
    }
}

module.exports = ScrapedAlbum;
