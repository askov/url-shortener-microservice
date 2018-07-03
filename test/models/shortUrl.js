const ShortUrl = require('../../models/shortUrl'),
  chai = require('chai'),
  expect = chai.expect;

describe('Model: ShortUrl', function() {
  it('should be invalid if empty', function(done) {
    const x = new ShortUrl.model();
    x.validate(function(err) {
      expect(err.errors).to.exist;
      done();
    });
  });
  it('should be correct with url String and shortUrl Number', function(done) {
    const x = new ShortUrl.model({
      url: 'google.com',
      shortUrl: 42
    });
    x.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });
  });
});
