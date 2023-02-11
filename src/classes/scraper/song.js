class ScrapedSong{
    constructor(data){
        this.name = data.name;
        this.artist = data.description.split(`Listen to ${this.name} on Spotify. `)[1].split(' ·')[0];
        this.description = data.description;
        this.publishDate = data.datePublished;
        this.locations = data.potentialAction.expectsAcceptanceOf.eligibleRegion.map(t => t.name);
        this.url = data.url;
    }
}

module.exports = ScrapedSong;
