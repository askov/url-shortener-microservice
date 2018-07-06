const constants = require('../lib/constants');
/**
 * Checks if provided url pattern is correct
 */
function parseUrl(req, res, next) {
  console.log('REQ BODY', req.body);
  req.correctUrl = constants.EMAIL_REGEX_PATTERN.test(req.body.url);
  next();
}

module.exports = parseUrl;
