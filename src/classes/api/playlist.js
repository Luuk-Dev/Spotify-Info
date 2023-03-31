class ApiPlaylist{
    constructor(data){
        this.name = data.name;
        this.collaborative = data.collaborative;
        this.url = data.external_urls.spotify;
        this.embedUrl = `https://open.spotify.com/embed/playlist/${data.id}`;
        this.followers = parseInt(data.followers.total);
        this.id = data.id;
        this.images = [...(data.images || [])];
        this.owner = {
            id: data.owner.id,
            name: data.owner.display_name,
            url: data.owner.external_urls.spotify,
            uri: data.owner.uri
        };
        this.public = data.public;
        this.description = data.description || null;
        this.tracks = typeof data.tracks === 'object' ? [...(data.tracks.items || []).map(i => {
            return {
                addedTimestamp: new Date(i.added_at).getTime(),
                name: i.track.name,
                url: i.track.external_urls.spotify,
                id: i.track.id,
                embedUrl: `https://open.spotify.com/embed/track/${i.track.id}`,
                location: [...(i.track.available_markets || [])],
                previewUrl: i.track.preview_url || null,
                explicit: i.track.explicit,
                duration: i.track.duration_ms,
                discNumber: i.track.disc_number,
                trackNumber: i.track.track_number,
                uri: i.track.uri,
                artists: [...(i.track.artists || []).map(a => {
                    return {
                        name: a.name,
                        url: a.external_urls.spotify,
                        id: a.id,
                        uri: a.uri
                    }
                })],
                album: {
                    type: i.track.album.album_type,
                    totalTracks: i.track.album.total_tracks,
                    url: i.track.album.external_urls.spotify,
                    id: i.track.album.id,
                    images: [...(i.track.album.images || [])],
                    name: i.track.album.name,
                    release: i.track.album.release_date,
                    locations: [...(i.track.album.available_markets || [])],
                    uri: i.track.album.uri,
                    artists: [...(i.track.album.artists || []).map(a => {
                        return {
                            name: a.name,
                            url: a.external_urls.spotify,
                            id: a.id,
                            uri: a.uri
                        }
                    })],
                }
            };
        })] : [];
    }
}

module.exports = ApiPlaylist;
