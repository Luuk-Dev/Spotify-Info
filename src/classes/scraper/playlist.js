const ScrapedPlaylistSong = require('./playlistSong.js');

class ScrapedPlaylist{
    constructor(data){
        this.id = data.playlistId;
        this.name = data.playlistName;
        this.creator = data.playlistCreator;
        this.url = `https://open.spotify.com/playlist/${data.playlistId}`;
        this.embedUrl = `https://open.spotify.com/embed/playlist/${data.playlistId}`;

        this.songs = [];

        for(var i = 0; i < data.songs.length; i++){
            let song = data.songs[i];
            this.songs.push(new ScrapedPlaylistSong(song));
        }
    }
}

module.exports = ScrapedPlaylist;
