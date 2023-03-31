const { request } = require('../request/index.js');
const { getCredentials, getAccessToken, getApiEndpoint } = require('../functions.js');
const { validateID, getID, validatePlaylistURL } = require('../validate.js');
const { URL } = require('url');
const ApiPlaylist = require('../classes/api/playlist.js');

function getPlaylist(url, options){
    return new Promise(async (resolve, reject) => {
        if(Object.values(getCredentials()).filter(t => typeof t !== 'string').length > 0) return reject('No api credentials have been set');
        if(typeof url !== 'string') return reject('The url argument must be a type of string');
        if(!validatePlaylistURL(url) && !validateID(url)) return reject('The provided url is not a valid playlist url or id');

        let accessToken;
        try{
            accessToken = await getAccessToken();
        } catch (err){
            return reject(err);
        }

        const playlistId = validateID(url) ? url : getID(url);
        if(!playlistId) return reject('Invalid url: Cannot get ID of playlist url');

        let searchParams = "";
        if(typeof options === 'object' && !Array.isArray(options) && options !== null){
            if(typeof options.market === 'string'){
                searchParams += "?market="+options.market;
            }
        }

        const endpoint = getApiEndpoint()+"playlists/"+playlistId+searchParams;
        const parsedEndpoint = new URL(endpoint);

        request(parsedEndpoint, {
            headers: {
                'Authorization': accessToken.type+' '+accessToken.token
            },
            method: 'GET'
        }).then(res => {
            let response = res;
            if(typeof response !== 'object'){
                try{
                    response = JSON.parse(response);
                } catch (err){
                    return reject('Cannot transform response \''+response+'\' to JSON format');
                }
            }
            resolve(new ApiPlaylist(response));
        }).catch(reject);
    });
}

module.exports = getPlaylist;
