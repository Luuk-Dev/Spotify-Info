const { request } = require('../request/index.js');
const { getCredentials, getAccessToken, getApiEndpoint } = require('../functions.js');
const { validateUserURL, validateID, getID } = require('../validate.js');
const { URL } = require('url');
const ApiUser = require('../classes/api/user.js');

function getUser(url){
    return new Promise(async (resolve, reject) => {
        if(Object.values(getCredentials()).filter(t => typeof t !== 'string').length > 0) return reject('No api credentials have been set');
        if(typeof url !== 'string') return reject('The url argument must be a type of string');
        if(!validateUserURL(url) && !validateID(url)) return reject('The provided url is not a valid user url or id');

        let accessToken;
        try{
            accessToken = await getAccessToken();
        } catch (err){
            return reject(err);
        }

        const userId = validateID(url) ? url : getID(url);
        if(!userId) return reject('Invalid url: Cannot get ID of user url');

        const endpoint = getApiEndpoint()+"users/"+userId;
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
            resolve(new ApiUser(response));
        }).catch(reject);
    });
}

module.exports = getUser;
