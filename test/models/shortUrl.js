const su = require('../../models/shortUrl'),
  chai = require('chai'),
  expect = chai.expect,
  dbsetup = require('../../db');

describe('Model: ShortUrl', function() {
  it('should not pass validation when created with null', function(done) {
    const x = new su.model(null);
    x.validate(function(err) {
      expect(err.errors).to.exist;
      done();
    });
  });
  it('should pass validation when created with correct object', function(done) {
    const x = new su.model({
      url: 'google.com',
      shortUrl: 42
    });
    x.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });
  });

  describe('Actions', function() {
    before(function(done) {
      dbsetup.connect(done);
    });
    it('should SAVE with string url provided', function(done) {
      const testurl = 'google.com';
      const cb = (err, data) => {
        expect(err).to.be.null;
        expect(data.shortUrl).to.be.a('number');
        done();
      };
      su.save(testurl, cb);
    })
    it('should NOT SAVE with null url', function(done) {
      const testurl = null;
      const cb = (err, data) => {
        expect(err).not.to.be.null;
        done();
      };
      su.save(testurl, cb);
    })
    it('should FIND existing shorturl', function(done) {
      const shorturl = 'MQ==';
      const cb = (err, data) => {
        expect(err).to.be.null;
        expect(data.shortUrl).to.be.a('number');
        done();
      };
      su.find(shorturl, cb);
    })
    it('should throw error when shortulr is not base64 encoded ', function(done) {
      const shorturl = 'qwe!1';
      const cb = (err, data) => {
        expect(err).not.to.be.null;
        done();
      };
      su.find(shorturl, cb);
    })
    it('should throw error with wrong shortulr', function(done) {
      const shorturl = 'qwe';
      const cb = (err, data) => {
        expect(err).not.to.be.null;
        done();
      };
      su.find(shorturl, cb);
    })
    it('should throw error if url not found', function(done) {
      const shorturl = 'OTk5OTk5OTk5';
      const cb = (err, data) => {
        expect(err).not.to.be.null;
        done();
      };
      su.find(shorturl, cb);
    })
    it('should return last shortened urls', function(done) {
      const cb = (err, data) => {
        expect(err).to.be.null;
        done();
      };
      su.last(cb);
    })
    after(function(done) {
      dbsetup.disconnect(done);
    });
  });

});
