const express = require('express'),
  router = express.Router();

router.post('/api/shorturl/new', (req, res) => {
  res.json({
    original_url: 'google.com',
    short_url: '1',
  });
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
