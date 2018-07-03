const CounterUrl = require('../../models/counterUrl'),
  chai = require('chai'),
  expect = chai.expect;

describe('Model: CounterUrl', function() {
  it('should be invalid if empty', function(done) {
    const x = new CounterUrl();
    x.validate(function(err) {
      expect(err.errors).to.exist;
      done();
    });
  });
  it('should be correct with _id String and urls Number', function(done) {
    const x = new CounterUrl({
      _id: '42',
      urls: 1
    });
    x.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });
  });
});
