const express = require('express'),
  router = express.Router(),
  dns = require('dns'),
  shortUrl = require('../models/shortUrl');


router.post('/api/shorturl/new', (req, res) => {
  const errRes = {
    error: 'invalid URL'
  };
  console.log('URL', req.body.url);
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
              short_url: data,
            });
          }
        };
        shortUrl.save(req.body.url, cb);
      }
    });
  } else {
    console.log('ERRR');

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
  console.log('REQ PARAMS', req.params.url);
  shortUrl.find(req.params.url, cb)

});

router.get('/', (req, res) => {
  const examples = [
    `${process.env.HOST}/api/shorturl/url`,
  ];
  res.render('index', {
    examples
  });
});


module.exports = router;
