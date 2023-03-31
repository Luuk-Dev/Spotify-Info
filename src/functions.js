const { request } = require('./request/index.js');
const { URL } = require('url');

let spotifyAPI = {
    clientId: process.env.SPOTIFY_CLIENT_ID || null,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || null
};

let accessToken = {
    token: null,
    expire: 0,
    type: null
}

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#x39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}

function setApiCredentials(clientId, clientSecret){
    if(typeof clientId !== 'string' || typeof clientSecret !== 'string') throw new Error('Invalid api credentials: The client id and client secret must be a string');
    spotifyAPI = {
        clientId,
        clientSecret
    };
}

function getCredentials(){
    return spotifyAPI;
}

function getAccessToken(){
    return new Promise((resolve, reject) => {
        const credentials = getCredentials();
        if(Object.values(credentials).filter(t => typeof t !== 'string').length > 0) throw new Error('Invalid credentials: Credentials haven\'t been set');

        let currentTimestamp = new Date().getTime();

        if(accessToken.expire < (currentTimestamp - 3e4)){
            const parsedSpotifyUrl = new URL('https://accounts.spotify.com/api/token');
            request(parsedSpotifyUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic '+(Buffer.from(credentials.clientId+':'+credentials.clientSecret).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials',
            }).then(_data => {
                let data;
                try{
                    data = JSON.parse(_data);
                } catch (err){
                    return reject('Error while transforming access token response \''+_data+'\' to JSON');
                }

                accessToken.expire = currentTimestamp + data.expires_in*1000;
                accessToken.token = data.access_token;
                accessToken.type = data.token_type;
                resolve(accessToken);
            }).catch(reject);
        } else {
            resolve(accessToken);
        }
    });
}

function getApiEndpoint(){
    return "https://api.spotify.com/v1/";
}

module.exports = { wait, decodeHTMLEntities, setApiCredentials, getCredentials, getAccessToken, getApiEndpoint };
