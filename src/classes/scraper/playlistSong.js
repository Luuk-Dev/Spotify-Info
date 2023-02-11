class ScrapedPlaylistSong{
    constructor(data){
        this.duration = data.length;
        this.name = data.name;
        this.artist = data.artist;
        this.durationString = data.lengthString;
    }
}

module.exports = ScrapedPlaylistSong;
