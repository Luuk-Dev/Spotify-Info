const { URL } = require('url');
const { request } = require('./request/index.js');
const { validateSongURL, validatePlaylistURL } = require('./validate.js');
const ScrapedSong = require('./classes/scraper/song.js');
const ScrapedPlaylist = require('./classes/scraper/playlist.js');
const { wait, decodeHTMLEntities } = require('./functions.js');

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

            await wait(400);
            try{
                let embedData = await request(embedParsedURL, {method: 'GET'});
                let splitEmbedData = embedData.split(/<span>/);
                json['name'] = splitEmbedData[3].split("</span>")[0];
                json['artist'] = splitEmbedData[4].split("</span>")[0];
                json['artistId'] = embedData.split("/artist/")[1].split("\"")[0].split("?")[0];
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
            obj['songs'] = [];

            let songs = res.split('<li ');
            songs.shift();
            for(var i = 0; i < songs.length; i++){
                var song = songs[i];
                let songContent = song.split(">").slice(1).join(">").split("</li>")[0];
                let songName = songContent.split("<h3")[1].split(">").slice(1).join(">").split("</h3>")[0];
                let songArtist = songContent.split("<h4")[1].split(">").slice(1).join(">").split("</h4>")[0];
                if(songArtist.indexOf('</span>') >= 0) songArtist = songArtist.split("</span>")[1];
                let songLengthString = songContent.split("<div")[2].split(">").slice(1).join(">").split("</div>")[0];
                let songLength = 0;
                let splittedSongLength = songLengthString.split(":");
                splittedSongLength.reverse();
                for(var z = 0; z < splittedSongLength.length; z++){
                    var numb = parseInt(splittedSongLength[z]);
                    if(z < 3){
                        songLength += numb * 60**z * 1000;
                    } else if(z === 3){
                        songLength += numb * 24 * 60**2 * 1000;
                    }
                }
                try{
                    songName = decodeURI(songName);
                } catch {}
                try{
                    songArtist = decodeURI(songArtist);
                } catch {}
                obj.songs.push({
                    name: decodeHTMLEntities(songName),
                    artist: decodeHTMLEntities(songArtist),
                    lengthString: songLengthString,
                    length: songLength
                });
            }

            resolve(new ScrapedPlaylist(obj));
        }).catch(reject);
    });
}

module.exports = { scrapeSong, scrapePlaylist };
