class ScrapedSong{
    constructor(data){
        this.name = data.name;
        this.artist = data.description.split(`Listen to ${this.name} on Spotify. `)[1].split(' ·')[0];
        this.artistUrl = `https://open.spotify.com/artist/${data.artistId}`;
        this.artistId = data.artistId;
        this.description = data.description;
        this.publishDate = data.datePublished;
        this.locations = data.potentialAction.expectsAcceptanceOf.eligibleRegion.map(t => t.name);
        this.url = data.url;
        this.embedUrl = `https://open.spotify.com/embed/track/${data.id}`;
        this.id = data.id;
    }
}

module.exports = ScrapedSong;
