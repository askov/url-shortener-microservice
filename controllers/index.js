const express = require('express'),
  router = express.Router();

router.use('/api/whoami', (req, res) => {
  const ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

router.use('/', (req, res) => {
  const examples = [
    `${process.env.HOST}/api/whoami`,
  ];
  res.render('index', {
    examples
  });
});


module.exports = router;
