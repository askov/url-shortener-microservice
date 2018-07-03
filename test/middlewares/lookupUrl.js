const lookupUrl = require('../../middlewares/lookupUrl'),
  chai = require('chai'),
  sinon = require('sinon'),
  expect = chai.expect;


describe('Middleware: lookupUrl', function() {
  let req = {
      body: {
        url: ''
      }
    },
    res = {},
    next = function() {};

  it('should call next if correctUrl is false', function(done) {
    req.correctUrl = false;
    next = sinon.spy();
    lookupUrl(req, res, next);
    expect(req.correctUrl).to.be.false;
    expect(next.called).to.be.true;
    done();
  });

  it('should change correctUrl to false if lookup failed', function(done) {
    req.body.url = 'googlezzzzzzzzzzzzzzzz.com';
    req.correctUrl = true;
    next = () => {
      expect(req.correctUrl).to.be.false;
      done();
    };
    lookupUrl(req, res, next);
  });

  it('should remain correctUrl true if lookup succeed', function(done) {
    req.body.url = 'yandex.ru';
    req.correctUrl = true;
    next = () => {
      expect(req.correctUrl).to.be.true;
      done();
    };
    lookupUrl(req, res, next);
  });
});
