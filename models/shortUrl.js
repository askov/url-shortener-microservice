const mongoose = require('mongoose');
const db = require('../db');

const counterUrl = require('./counterUrl');
const shortUrlSchema = mongoose.Schema({
  url: String
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports.save = function(url, cb) {
  // const shortUrl = new ShortUrl({
  //   url
  // });
  const conditions = {},
    update = {
      url: url,
      // $inc: {
      //   urlcounter: 1
      // }
    },
    opts = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };
  ShortUrl.findOneAndUpdate(conditions, update, opts, function(err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
  // shortUrl.save(function(err, data) {
  //   if (err) return cb(err);
  //   cb(null, data);
  // });
};
