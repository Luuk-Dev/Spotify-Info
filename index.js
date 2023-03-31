const validateFunctions = require('./src/validate.js');
const scrapeFunctions = require('./src/scraper.js');
const { setApiCredentials } = require('./src/functions.js');
const getTrack = require('./src/api/getTrack.js');
const getAlbum = require('./src/api/getAlbum.js');
const getPlaylist = require('./src/api/getPlaylist.js');
const getArtist = require('./src/api/getArtist.js');
const search = require('./src/api/search.js');

module.exports = {...validateFunctions, ...scrapeFunctions, setApiCredentials, getTrack, getAlbum, getPlaylist, getArtist, search};
