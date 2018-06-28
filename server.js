'use strict';

require('dotenv').config();

const express = require('express'),
  app = express(),
  config = require('./config');


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(require('./controllers'));

const server = app.listen(config.port, function() {
  console.log(`Server listening at port ${server.address().port}`);
});

module.exports = server;
