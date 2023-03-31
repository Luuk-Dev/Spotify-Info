class ApiAlbum{
    constructor(data){
        this.type = data.album_type;
        this.name = data.name;
        this.totalTracks = data.total_tracks;
        this.locations = [...(data.available_markets || [])];
        this.url = data.external_urls.spotify;
        this.embedUrl = `https://open.spotify.com/embed/album/${data.id}`;
        this.id = data.id;
        this.images = [...(data.images || [])];
        this.release = data.release_date;
        this.uri = data.uri;
        this.copyrights = (data.copyrights || []).map(c => c.text);
        this.genres = [...(data.genres || [])];
        this.label = data.label || null;
        this.artists = [...data.artists.map(a => {
            return {
                name: a.name,
                id: a.id,
                url: a.external_urls.spotify,
                uri: a.uri
            }
        })];
        this.popularity = data.popularity || null;
        this.tracks = [...data.tracks.items.map(i => {
            return {
                name: i.name,
                url: i.external_urls.spotify,
                id: i.id,
                embedUrl: `https://open.spotify.com/embed/track/${i.id}`,
                location: [...(i.available_markets || [])],
                previewUrl: i.preview_url || null,
                explicit: i.explicit,
                duration: i.duration_ms,
                discNumber: i.disc_number,
                trackNumber: i.track_number,
                uri: i.uri,
                artists: [...(i.artists || []).map(a => {
                    return {
                        name: a.name,
                        url: a.external_urls.spotify,
                        id: a.id,
                        uri: a.uri
                    }
                })],
                album: this
            };
        })];
    }
}

module.exports = ApiAlbum;
