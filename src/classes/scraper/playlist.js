const ScrapedPlaylistTrack = require('./playlistTrack.js');

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

        this.tracks = [];

        for(var i = 0; i < data.tracks.length; i++){
            let track = data.tracks[i];
            this.tracks.push(new ScrapedPlaylistTrack(track));
        }
    }
}

module.exports = ScrapedPlaylist;
