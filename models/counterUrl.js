const mongoose = require('mongoose');

const counterUrlSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  urls: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('CounterUrl', counterUrlSchema);
