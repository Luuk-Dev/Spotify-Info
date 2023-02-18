const { URL } = require('url');
const { request } = require('./request/index.js');
const { validateSongURL, validatePlaylistURL, validateAlbumURL } = require('./validate.js');
const { playlistExtractor } = require('./extractor.js');
const ScrapedSong = require('./classes/scraper/song.js');
const ScrapedPlaylist = require('./classes/scraper/playlist.js');
const { wait } = require('./functions.js');
const Album = require('./classes/scraper/album.js');

function scrapeSong(url){
    return new Promise((resolve, reject) => {
        if(!validateSongURL(url)) return reject('URL is not a Spotify song url');

        var parsedURL = new URL(url);

        const trackId = parsedURL.pathname.split("/track/")[1].split("/")[0];
        var embedParsedURL = new URL("https://open.spotify.com/embed/track/"+trackId);

        request(parsedURL, {
            method: 'GET'
        }).then(async res => {
            let data = res.split('<script type="application/ld+json">')[1];
            if(!data) return reject('This song doesn\'t have any song info');
            data = data.split('</script>')[0];
            let json = data;
            try{
                json = JSON.parse(json);
            } catch {}
            let parsedNextUrl = new URL(json.url);
            while(parsedURL.pathname !== parsedNextUrl.pathname){
                try{
                    prevUrl = json.url;
                    parsedURL = new URL(json.url);
                    let reqData = await request(parsedURL, {method: 'GET'});
                    let newData = reqData.split('<script type="application/ld+json">')[1];
                    if(!newData) return reject('This song doesn\'t have any song info');
                    newData = newData.split('</script>')[0];
                    json = newData;
                    json = JSON.parse(json);
                    parsedNextUrl = new URL(json.url);
                } catch(err) {
                    return reject(err);
                }
            }
            json['id'] = trackId;
            json['artistId'] = res.split("/artist/")[1].split("\"")[0].split("?")[0];

            await wait(400);
            try{
                let embedData = await request(embedParsedURL, {method: 'GET'});
                let splitEmbedData = embedData.split(/<span>/);
                json['name'] = splitEmbedData[3].split("</span>")[0];
                json['artist'] = splitEmbedData[4].split("</span>")[0];
            } catch {}

            resolve(new ScrapedSong(json));
        }).catch(reject);
    });
}

function scrapePlaylist(url){
    return new Promise((resolve, reject) => {
        if(!validatePlaylistURL(url)) return reject('URL is not a Spotify song url');

        var parsedURL = new URL(url);

        const playlistId = parsedURL.pathname.split("/playlist/")[1].split("/")[0];
        var embedParsedURL = new URL("https://open.spotify.com/embed/playlist/"+playlistId);

        request(embedParsedURL, {
            method: 'GET'
        }).then(res => {
            let obj = {};

            obj['playlistName'] = res.split('<span>')[3].split("</span>")[0];
            obj['playlistCreator'] = res.split('<span>')[4].split("</span>")[0];
            obj['playlistId'] = playlistId;
            obj['songs'] = playlistExtractor(res);

            resolve(new ScrapedPlaylist(obj));
        }).catch(reject);
    });
}

function scrapeAlbum(url){
    return new Promise((resolve, reject) => {
        if(!validateAlbumURL(url)) return reject('URL is not a Spotify album url');

        var parsedURL = new URL(url);

        const albumId = parsedURL.pathname.split("/album/")[1].split("/")[0];
        var embedParsedURL = new URL("https://open.spotify.com/embed/album/"+albumId);

        request(embedParsedURL, {
            method: 'GET'
        }).then(res => {
            let obj = {};

            obj['albumName'] = res.split('<h1')[1].split('<a')[1].split('</a>')[0].split('>').slice(1).join('>');
            obj['albumId'] = albumId;
            obj['artist'] = res.split('<h2')[1].split("<a")[1].split('</a>')[0].split('>').slice(1).join('>');
            obj['songs'] = playlistExtractor(res);

            resolve(new Album(obj));
        }).catch(reject);
    });
}

module.exports = { scrapeSong, scrapePlaylist, scrapeAlbum };
