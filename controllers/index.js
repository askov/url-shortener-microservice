const express = require('express'),
  router = express.Router(),
  dns = require('dns'),
  shortUrl = require('../models/shortUrl'),
  base64 = require('base-64');


router.post('/api/shorturl/new', (req, res) => {
  const errRes = {
    error: 'invalid URL'
  };
  if (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(req.body.url)) {
    dns.lookup(req.body.url, (err, address, family) => {
      if (err) {

        res.json(errRes);
      } else {
        const cb = (err, data) => {
          if (err) {
            res.json(errRes);
          } else {
            res.json({
              original_url: req.body.url,
              short_url: base64.encode(data.shortUrl),
            });
          }
        };
        shortUrl.save(req.body.url, cb);
      }
    });
  } else {
    res.json(errRes);
  }
});

router.get('/api/shorturl/:url', (req, res) => {
  const cb = (err, data) => {
    if (err) {
      res.status(301).redirect('/');
    } else {
      let url = data.url;
      if (/^https?:\/\//.test(data.url)) {
        url = 'http://' + url;
      }
      res.status(301).redirect('https://' + url);
    }
  };
  shortUrl.find(req.params.url, cb)
});

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
