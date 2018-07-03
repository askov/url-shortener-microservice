const dns = require('dns');

/**
 * Resolves domain
 */
function lookupUrl(req, res, next) {
  if (!req.correctUrl) {
    return next();
  }
  dns.lookup(req.body.url, (err, address, family) => {
    if (err) {
      req.correctUrl = false;
      return next();
    }
    req.correctUrl = true;
    next();
  });
}

module.exports = lookupUrl;
