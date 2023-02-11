const { URL } = require('url');
const { request } = require('./request/index.js');
const { validateSongURL } = require('./validate.js');
const ScrapedSong = require('./classes/scraper/song.js');

function scrapeSong(url){
    return new Promise((resolve, reject) => {
        if(!validateSongURL(url)) return reject('URL is not a Spotify song url');

        var parsedURL = new URL(url);

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
                    console.log(json.url, url)
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
            console.log(json);
            resolve(new ScrapedSong(json));
        }).catch(reject);
    });
}

module.exports = { scrapeSong };
