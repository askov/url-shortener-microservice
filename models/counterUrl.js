const mongoose = require('mongoose');
// const db = require('../db');

const counterUrlSchema = mongoose.Schema({
  urls: {
    type: Number,
    default: 0
  }
});

const CounterUrl = mongoose.model('CounterUrl', counterUrlSchema);

// module.exports.save = function(url, cb) {
//   // const counterUrl = new ShortUrl({
//   //   url
//   // });
//   // shortUrl.save(function(err, data) {
//   //   if (err) return cb(err);
//   //   cb(null, data);
//   // });
// };
