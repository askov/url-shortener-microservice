const parseUrl = require('../../middlewares/parseUrl'),
  chai = require('chai'),
  sinon = require('sinon'),
  expect = chai.expect;


describe('Middleware: parseUrl', function() {
  let req = {
      body: {
        url: ''
      }
    },
    res = {},
    next = function() {};

  it('should set correctUrl to true with correct url', function(done) {
    req.body.url = 'google.com';
    next = sinon.spy();
    parseUrl(req, res, next);
    expect(req.correctUrl).to.be.true;
    expect(next.called).to.be.true;
    done();
  });

  it('should set correctUrl to false with incorrect url', function(done) {
    req.body.url = 'googlecom';
    next = sinon.spy();
    parseUrl(req, res, next);
    expect(req.correctUrl).to.be.false;
    expect(next.called).to.be.true;
    done();
  });
});
