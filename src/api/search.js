const { request } = require('../request/index.js');
const { getCredentials, getAccessToken, getApiEndpoint } = require('../functions.js');
const { URL } = require('url');
const SearchResult = require('../classes/api/searchResult.js');

function validateURL(url){
    const parsedApiEndpoint = new URL(getApiEndpoint());
    try{
        const parsed = new URL(url);
        if(parsed.hostname === parsedApiEndpoint.hostname && parsed.pathname === parsedApiEndpoint.pathname + "search" && parsed.searchParams.has('q') && parsed.searchParams.has('type')) return true;
        else return false;
    } catch {
        return false;
    }
}

function search(query, options){
    return new Promise(async (resolve, reject) => {
        if(Object.values(getCredentials()).filter(t => typeof t !== 'string').length > 0) return reject('No api credentials have been set');
        if(typeof query !== 'string') return reject('The query argument must be a type of string');

        let accessToken;
        try{
            accessToken = await getAccessToken();
        } catch (err){
            return reject(err);
        }

        const isApiEndpoint = validateURL(query);

        let searchParams = "";
        if(!isApiEndpoint){
            searchParams = "?q="+query;
            if(typeof options === 'object' && !Array.isArray(options) && options !== null){
                const allowedTypes = ['album', 'track', 'playlist', 'artist'];
                if(typeof options.limit === 'number'){
                    if(options.limit > 50) options.limit = 50;
                    else if(options.limit < 0) options.limit = 0;
                    searchParams += "&limit="+options.limit.toString();
                }
                if(typeof options.market === 'string'){
                    searchParams += "&market="+options.market;
                }
                if(typeof options.offset === 'number'){
                    if(options.offset > 1000) options.offset = 1000;
                    else if(options.offset < 0) options.offset = 0;
                    searchParams += "&offset="+options.offset.toString();
                }
                if(Array.isArray(options.type)){
                    const searchTypes = options.type.filter(t => allowedTypes.indexOf(t.toLowerCase()) >= 0);
                    if(searchTypes.length === 0){
                        searchParams += "&type="+allowedTypes.join(',');
                    } else {
                        searchParams += "&type="+searchTypes.map(t => t.toLowerCase()).join(',');
                    }
                } else {
                    searchParams += "&type="+allowedTypes.join(',');
                }
            }
        }

        const endpoint = !isApiEndpoint ? getApiEndpoint()+"search"+searchParams : query;
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
            resolve(new SearchResult(response));
        }).catch(reject);
    });
}

module.exports = search;
