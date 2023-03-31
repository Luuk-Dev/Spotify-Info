const ApiTrack = require('./track.js');
const SearchAlbum = require('./searchResults/album.js');
const SearchPlaylist = require('./searchResults/playlist.js');
const ApiArtist = require('./artist.js');

class SearchResult{
    constructor(data){
        this.tracks = typeof data.tracks === 'object' ? {
            limit: data.tracks.limit,
            offset: data.tracks.offset,
            total: data.tracks.total,
            nextPage: typeof data.tracks.next === 'string' ? function(){
                return new Promise((resolve, reject) => {
                    const search = require('../../api/search.js');
                    search(data.tracks.next).then(resolve).catch(reject);
                });
            } : null,
            previousPage: typeof data.tracks.previous === 'string' ? function(){
                return new Promise((resolve, reject) => {
                    const search = require('../../api/search.js');
                    search(data.tracks.previous).then(resolve).catch(reject);
                });
            } : null,
            items: data.tracks.items.map(i => new ApiTrack(i))
        } : {
            limit: 0,
            offset: 0,
            total: 0,
            nextPage: null,
            previousPage: null,
            items: []
        };
        this.albums = typeof data.albums === 'object' ? {
            limit: data.albums.limit,
            offset: data.albums.offset,
            total: data.albums.total,
            nextPage: typeof data.albums.next === 'string' ? function(){
                return new Promise((resolve, reject) => {
                    const search = require('../../api/search.js');
                    search(data.albums.next).then(resolve).catch(reject);
                });
            } : null,
            previousPage: typeof data.albums.previous === 'string' ? function(){
                return new Promise((resolve, reject) => {
                    const search = require('../../api/search.js');
                    search(data.albums.previous).then(resolve).catch(reject);
                });
            } : null,
            items: data.albums.items.map(i => new SearchAlbum(i))
        } : {
            limit: 0,
            offset: 0,
            total: 0,
            nextPage: null,
            previousPage: null,
            items: []
        };
        this.playlists = typeof data.playlists === 'object' ? {
            limit: data.playlists.limit,
            offset: data.playlists.offset,
            total: data.playlists.total,
            nextPage: typeof data.playlists.next === 'string' ? function(){
                return new Promise((resolve, reject) => {
                    const search = require('../../api/search.js');
                    search(data.playlists.next).then(resolve).catch(reject);
                });
            } : null,
            previousPage: typeof data.playlists.previous === 'string' ? function(){
                return new Promise((resolve, reject) => {
                    const search = require('../../api/search.js');
                    search(data.playlists.previous).then(resolve).catch(reject);
                });
            } : null,
            items: data.playlists.items.map(i => new SearchPlaylist(i))
        } : {
            limit: 0,
            offset: 0,
            total: 0,
            nextPage: null,
            previousPage: null,
            items: []
        };
        this.artists = typeof data.artists === 'object' ? {
            limit: data.artists.limit,
            offset: data.artists.offset,
            total: data.artists.total,
            nextPage: typeof data.artists.next === 'string' ? function(){
                return new Promise((resolve, reject) => {
                    const search = require('../../api/search.js');
                    search(data.artists.next).then(resolve).catch(reject);
                });
            } : null,
            previousPage: typeof data.artists.previous === 'string' ? function(){
                return new Promise((resolve, reject) => {
                    const search = require('../../api/search.js');
                    search(data.artists.previous).then(resolve).catch(reject);
                });
            } : null,
            items: data.artists.items.map(i => new ApiArtist(i))
        } : {
            limit: 0,
            offset: 0,
            total: 0,
            nextPage: null,
            previousPage: null,
            items: []
        };
    }
}

module.exports = SearchResult;
