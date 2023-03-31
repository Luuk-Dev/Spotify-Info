const https = require('https');
const http = require('http');
const dns = require('dns');
const { promisify } = require('util');
const { getRandomUserAgent } = require('./useragent.js');

const lookup = promisify(dns.lookup);

function request(parsedURL, options = {}){
    return new Promise(async (resolve, reject) => {

        var family = 4;
        try{
            var dnsInfo = await lookup(parsedURL.hostname, {hints: 0});
            family = dnsInfo.family;
        } catch {}
        
        const reqType = (parsedURL.protocol.split(':')[0].toLowerCase() === 'https' ? https : http);

        const agent = new reqType.Agent({
            keepAlive: true,
            timeout: 2000,
            keepAliveMsecs: (Math.round(Math.random() * 10) + 10)
        });

        let defaultHeaders = {
            'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8,hi;q=0.7',
            'sec-ch-ua': '"Chromium";v="108", "Opera GX";v="94", "Not)A;Brand";v="99"',
            'sec-ch-ua-platform': '"Windows"',
            'user-agent': getRandomUserAgent()
        }

        let customHeaders = options.headers || {};
        for(var key in customHeaders){
            defaultHeaders[key] = customHeaders[key];
        }

        const req = reqType.request({
            hostname: parsedURL.hostname,
            path: parsedURL.pathname + parsedURL.search,
            protocol: parsedURL.protocol,
            agent: agent,
            method: options.method || 'GET',
            headers: defaultHeaders,
            family: family
        }, res => {
            if(res.statusCode < 200 || res.statusCode > 300) return reject(res.statusMessage);
            let data = '';

            res.on('data', d => {
                data += d;
            });

            res.on('end', () => {
                resolve(data);
            });

            res.on('error', err => {
                reject(err);
            });
        });

        req.on('error', err => {
            reject(err);
        });

        if(typeof options.body === 'object'){
            req.write(JSON.stringify(options.body));
        } else if(typeof options.body === 'string' || typeof options.body === 'number'){
            req.write(options.body);
        } else if(typeof options.body === 'function'){
            req.write(options.body());
        }

        req.end();
    });
}

module.exports = { request };
