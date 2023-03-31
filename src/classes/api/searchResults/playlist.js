const getPlaylist = require('../../../api/getPlaylist.js');

class SearchPlaylist{
    constructor(data){
        console.log(data);
        this.name = data.name;
        this.collaborative = data.collaborative;
        this.url = data.external_urls.spotify;
        this.embedUrl = `https://open.spotify.com/embed/album/${data.id}`;
        this.id = data.id;
        this.uri = data.uri;
        this.images = [...(data.images || [])];
        this.owner = {
            id: data.owner.id,
            name: data.owner.display_name,
            url: data.owner.external_urls.spotify,
            uri: data.owner.uri
        };
        this.public = data.public;
        this.description = data.description || null;
        this.getTracks = function(options){
            return new Promise((resolve, reject) => {
                getPlaylist(data.tracks.href, options).then(playlist => {
                    resolve(playlist.tracks);
                }).catch(reject);
            });
        }
    }
}

module.exports = SearchPlaylist;
