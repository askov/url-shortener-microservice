const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const counterUrlSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  urls: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('CounterUrl', counterUrlSchema);
