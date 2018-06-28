let server = require('../server');

let chai = require('chai'),
  expect = chai.expect;

chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));


describe('/GET /', () => {
  it('index page', done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});

describe('/GET /api/api/whoami', () => {
  let resSuccessSchema = {
    type: 'object',
    required: ['ipaddress', 'language', 'software'],
    properties: {
      ipaddress: {
        type: 'string'
      },
      language: {
        type: 'string'
      },
      software: {
        type: 'string'
      },
    }
  };

  it('/GET whoami schema', done => {
    chai.request(server)
      .get('/api/whoami')
      .set('accept-language', 'en-US,en;q=0.5')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(resSuccessSchema);
        done();
      });
  });



});
