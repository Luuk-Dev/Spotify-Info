const { URL } = require('url');
const { request } = require('./request/index.js');
const { validateTrackURL, validatePlaylistURL, validateAlbumURL } = require('./validate.js');
const { playlistExtractor } = require('./extractor.js');
const ScrapedTrack = require('./classes/scraper/track.js');
const ScrapedPlaylist = require('./classes/scraper/playlist.js');
const { wait } = require('./functions.js');
const Album = require('./classes/scraper/album.js');

function scrapeTrack(url){
    return new Promise((resolve, reject) => {
        if(!validateTrackURL(url)) return reject('URL is not a Spotify track url');

        var parsedURL = new URL(url);
        parsedURL.set('nd', '1');

        const trackId = parsedURL.pathname.split("/track/")[1].split("/")[0];
        var embedParsedURL = new URL("https://open.spotify.com/embed/track/"+trackId);

        request(parsedURL, {
            method: 'GET'
        }).then(async res => {
            let data = res.split('<script type="application/ld+json">')[1];
            if(!data) return reject('This track doesn\'t have any track info');
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
                    if(!newData) return reject('This track doesn\'t have any track info');
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

            resolve(new ScrapedTrack(json));
        }).catch(reject);
    });
}

function scrapePlaylist(url){
    return new Promise((resolve, reject) => {
        if(!validatePlaylistURL(url)) return reject('URL is not a Spotify track url');

        var parsedURL = new URL(url);
        parsedURL.set('nd', '1');

        const playlistId = parsedURL.pathname.split("/playlist/")[1].split("/")[0];
        var embedParsedURL = new URL("https://open.spotify.com/embed/playlist/"+playlistId);

        request(embedParsedURL, {
            method: 'GET'
        }).then(async res => {
            let obj = {};

            obj['playlistName'] = res.split('<span>')[3].split("</span>")[0];
            obj['playlistCreator'] = res.split('<span>')[4].split("</span>")[0];
            obj['playlistId'] = playlistId;
            obj['tracks'] = playlistExtractor(res);

            try{
                let parsedMainUrl = new URL("https://open.spotify.com/playlist/"+playlistId);
                let mainPageRequest = await request(parsedMainUrl);
                obj['playlistCreatorId'] = mainPageRequest.split("/user/")[1];
                obj['playlistCreatorId'] = obj['playlistCreatorId'] ? obj['playlistCreatorId'].split("\"")[0].split("?")[0] : null;
                obj['thumbnail'] = mainPageRequest.split("<meta property=\"og:image\"")[1];
                obj['thumbnail'] = obj['thumbnail'] ? obj['thumbnail'].split("content=\"")[1] : null;
                obj['thumbnail'] = obj['thumbnail'] ? obj['thumbnail'].split("\"")[0].split("?")[0] : null;

                let pageData = mainPageRequest.split("<script type=\"application/ld+json\">")[1];
                if(pageData){
                    pageData = pageData.split("</script>")[0];
                    pageData = JSON.parse(pageData);
                    obj['description'] = pageData['description'] || null;
                    obj['locations'] = pageData.potentialAction.expectsAcceptanceOf.eligibleRegion.map(t => t.name) || null;
                }
            } catch {}

            resolve(new ScrapedPlaylist(obj));
        }).catch(reject);
    });
}

function scrapeAlbum(url){
    return new Promise((resolve, reject) => {
        if(!validateAlbumURL(url)) return reject('URL is not a Spotify album url');

        var parsedURL = new URL(url);
        parsedURL.set('nd', '1');

        const albumId = parsedURL.pathname.split("/album/")[1].split("/")[0];
        var embedParsedURL = new URL("https://open.spotify.com/embed/album/"+albumId);

        request(embedParsedURL, {
            method: 'GET'
        }).then(async res => {
            let obj = {};

            obj['albumName'] = res.split('<h1')[1].split('<a')[1].split('</a>')[0].split('>').slice(1).join('>');
            obj['albumId'] = albumId;
            obj['artist'] = res.split('<h2')[1].split("<a")[1].split('</a>')[0].split('>').slice(1).join('>');
            obj['tracks'] = playlistExtractor(res);

            try{
                let parsedMainUrl = new URL("https://open.spotify.com/album/"+albumId);
                let mainPageRequest = await request(parsedMainUrl);
                obj['artistId'] = mainPageRequest.split("/artist/")[1];
                obj['artistId'] = obj['artistId'] ? obj['artistId'].split("\"")[0].split("?")[0] : null;
                obj['thumbnail'] = mainPageRequest.split("<meta property=\"og:image\"")[1];
                obj['thumbnail'] = obj['thumbnail'] ? obj['thumbnail'].split("content=\"")[1] : null;
                obj['thumbnail'] = obj['thumbnail'] ? obj['thumbnail'].split("\"")[0].split("?")[0] : null;
                
                let pageData = mainPageRequest.split("<script type=\"application/ld+json\">")[1];
                if(pageData){
                    pageData = pageData.split("</script>")[0];
                    pageData = JSON.parse(pageData);
                    obj['publishDate'] = pageData['datePublished'] || null;
                    obj['description'] = pageData['description'] || null;
                    obj['locations'] = pageData.potentialAction.expectsAcceptanceOf.eligibleRegion.map(t => t.name) || null;
                }
            } catch {}

            resolve(new Album(obj));
        }).catch(reject);
    });
}

module.exports = { scrapeTrack, scrapePlaylist, scrapeAlbum };
