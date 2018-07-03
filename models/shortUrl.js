const mongoose = require('mongoose'),
  base64 = require('base-64'),
  counterUrl = require('./counterUrl');

const shortUrlSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  shortUrl: {
    type: Number,
  }
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

shortUrlSchema.pre('save', function(next) {
  const doc = this;
  const query = {},
    update = {
      $inc: {
        urls: 1
      }
    },
    opts = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };
  counterUrl.findOneAndUpdate(query, update, opts, function(err, data) {
    if (err) return next(err);
    doc.shortUrl = data.urls;
    next();
  });
});

module.exports.model = ShortUrl;

module.exports.save = function(url, cb) {
  ShortUrl.findOne({
    url
  }, function(err, data) {
    if (err) return cb(err);
    if (data) return cb(null, data);
    const shortUrl = new ShortUrl({
      url
    });
    shortUrl.save(function(err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  });
};

module.exports.find = function(shortUrl, cb) {
  let decoded;
  try {
    decoded = base64.decode(shortUrl);
  } catch (err) {
    return cb(err);
  }
  ShortUrl.findOne({
    shortUrl: decoded
  }, function(err, data) {
    if (err) return cb(err);
    if (!data) return cb(new Error('Not found'))
    cb(null, data);
  });
};

module.exports.last = function(cb) {
  ShortUrl.find({}).sort({
    shortUrl: -1
  }).limit(3).exec(function(err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
};
