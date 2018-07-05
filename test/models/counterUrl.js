const CounterUrl = require('../../models/counterUrl'),
  chai = require('chai'),
  expect = chai.expect;

describe('Model: CounterUrl', function() {
  it('should not pass validation when created with null', function(done) {
    const x = new CounterUrl(null);
    x.validate(function(err) {
      expect(err.errors).to.exist;
      done();
    });
  });
  it('should pass validation when created with correct object', function(done) {
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
