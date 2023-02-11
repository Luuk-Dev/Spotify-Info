const validateFunctions = require('./src/validate.js');
const scrapeFunctions = require('./src/scraper.js');

module.exports = {...validateFunctions, ...scrapeFunctions};
