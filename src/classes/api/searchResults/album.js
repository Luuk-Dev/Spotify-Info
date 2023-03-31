const getAlbum = require('../../../api/getAlbum.js');

class SearchAlbum{
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
        this.artists = [...(data.artists || []).map(a => {
            return {
                name: a.name,
                id: a.id,
                uri: a.uri,
                url: a.external_urls.spotify
            };
        })];
        this.getTracks = function(options){
            return new Promise((resolve, reject) => {
                getAlbum(data.href, options).then(album => {
                    resolve(album.tracks);
                }).catch(reject);
            });
        }
    }
}

module.exports = SearchAlbum;
