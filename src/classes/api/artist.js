class ApiArtist{
    constructor(data){
        this.name = data.name;
        this.id = data.id;
        this.url = data.external_urls.spotify;
        this.embedUrl = `https://open.spotify.com/embed/artist/${data.id}`;
        this.uri = data.uri;
        this.followers = parseInt(data.followers.total);
        this.genres = [...(data.genres || [])];
        this.images = [...(data.images || [])];
        this.popularity = data.popularity || null;
    }
}

module.exports = ApiArtist;
