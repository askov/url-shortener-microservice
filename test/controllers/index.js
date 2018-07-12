let chai = require('chai'),
  expect = chai.expect;
const dbsetup = require('../../db');

chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));

describe('Controllers: Integration tests (db required)', () => {
  let server;
  before(function (done) {
    server = require('../../server');
    done();
  });

  it('should return index page /GET', done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
  let resSuccessSchema = {
    type: 'object',
    required: ['original_url', 'short_url'],
    properties: {
      original_url: {
        type: 'string'
      },
      short_url: {
        type: 'string'
      }
    }
  };
  it('should create short url for correct url /POST', done => {
    chai.request(server)
      .post('/api/shorturl/new')
      .type('json')
      .send({
        url: 'mail.ru'
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(resSuccessSchema);
        done();
      });
  });
  it('should return error when incorrect url provided /POST ', done => {
    chai.request(server)
      .post('/api/shorturl/new')
      .type('json')
      .send({
        url: 'mailru'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should redirect with existing short url /GET ', done => {
    chai.request(server)
      .get('/api/shorturl/1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.redirect;
        done();
      });
  });
  it('should redirect to home page with nonexisting short url /GET ', done => {
    chai.request(server)
      .get('/api/shorturl/fsdfsdss')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.redirect;
        done();
      });
  });
  after(function (done) {
    const cb = () => {
      dbsetup.disconnect(done);
    };
    server.close(cb);
  });
});
