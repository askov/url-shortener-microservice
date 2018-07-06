const express = require('express'),
  router = express.Router(),
  base64 = require('base-64'),
  shortUrl = require('../models/shortUrl'),
  parseUrl = require('../middlewares/parseUrl'),
  lookupUrl = require('../middlewares/lookupUrl');

/**
 * POST: Creates new short url for provided url
 * if provided url isn't correct, returns error
 */
router.post('/api/shorturl/new', parseUrl, lookupUrl, (req, res) => {
  const errRes = {
    error: 'invalid URL'
  };
  if (!req.correctUrl) {
    res.status(400).json(errRes);
    return;
  }
  const cb = (err, data) => {
    if (err) {
      return res.status(400).json(errRes);
    }
    res.json({
      original_url: req.body.url,
      short_url: base64.encode(data.shortUrl),
    });
  };
  shortUrl.save(req.body.url, cb);
});

/**
 * GET: Redirects with short url to the corresponding url.
 * Redirects to index page if short url is not presented
 */
router.get('/api/shorturl/:url', (req, res) => {
  const cb = (err, data) => {
    if (err) {
      return res.redirect('/');
    }
    let url = data.url;
    if (!/^https?:\/\//.test(data.url)) {
      url = 'https://' + url;
    }
    res.redirect(url);
  };
  shortUrl.find(req.params.url, cb)
});

/**
 * GET: Index page. Provides info about last shortened urls
 */
router.get('/', (req, res) => {
  const cb = (err, data) => {
    const last = data || [];
    const examples = last.map(el => `${process.env.HOST}/api/shorturl/${base64.encode(el.shortUrl)}`);
    res.render('index', {
      examples,
      examplesQty: examples.length
    });
  };
  shortUrl.last(cb);
});


module.exports = router;
