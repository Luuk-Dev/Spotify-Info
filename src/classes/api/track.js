class ApiTrack{
    constructor(data){
        this.name = data.name;
        this.locations = [...(data.available_markets || [])];
        this.url = data.external_urls.spotify;
        this.embedUrl = `https://open.spotify.com/embed/track/${data.id}`;
        this.id = data.id;
        this.discNumber = data.disc_number;
        this.trackNumber = data.track_number;
        this.explicit = data.explicit;
        this.album = typeof data.album === 'object' ? {
            name: data.album.name,
            images: [...(data.album.images || [])],
            id: data.album.id,
            release: data.album.release_date,
            totalTracks: data.album.total_tracks,
            type: data.album.album_type,
            url: data.album.external_urls.spotify,
            locations: [...(data.album.available_markets || [])],
            artists: [...(data.album.artists || []).map(a => {
                return {
                    name: a.name,
                    url: a.external_urls.spotify,
                    id: a.id,
                    uri: a.uri
                };
            })],
            uri: data.album.uri
        } : null;
        this.artists = [...(data.artists || []).map(a => {
            return {
                name: a.name,
                url: a.external_urls.spotify,
                id: a.id,
                uri: a.uri
            };
        })];
        this.uri = data.uri;
        this.popularity = data.popularity;
        this.duration = data.duration_ms;
        this.previewUrl = data.preview_url || null;
    }
}

module.exports = ApiTrack;
