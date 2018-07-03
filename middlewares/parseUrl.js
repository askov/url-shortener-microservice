/**
 * Checks if provided url pattern is correct
 */
function parseUrl(req, res, next) {
  req.correctUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(req.body.url);
  next();
}

module.exports = parseUrl;
