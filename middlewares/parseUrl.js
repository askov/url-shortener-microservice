const constants = require('../lib/constants');
/**
 * Checks if provided url pattern is correct
 */
function parseUrl(req, res, next) {
  req.correctUrl = constants.EMAIL_REGEX_PATTERN.test(req.body.url);
  next();
}

module.exports = parseUrl;
