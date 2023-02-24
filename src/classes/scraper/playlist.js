const ScrapedPlaylistSong = require('./playlistSong.js');

class ScrapedPlaylist{
    constructor(data){
        this.id = data.playlistId;
        this.name = data.playlistName;
        this.creator = data.playlistCreator;
        this.creatorId = data.playlistCreatorId ? data.playlistCreatorId : null;
        this.creatorUrl = data.playlistCreatorId ? `https://open.spotify.com/user/${data.playlistCreatorId}` : null;
        this.url = `https://open.spotify.com/playlist/${data.playlistId}`;
        this.embedUrl = `https://open.spotify.com/embed/playlist/${data.playlistId}`;
        this.locations = data.locations || [];
        this.description = data.description || null;

        this.thumbnail = data.thumbnail ? data.thumbnail : null;

        this.songs = [];

        for(var i = 0; i < data.songs.length; i++){
            let song = data.songs[i];
            this.songs.push(new ScrapedPlaylistSong(song));
        }
    }
}

module.exports = ScrapedPlaylist;
