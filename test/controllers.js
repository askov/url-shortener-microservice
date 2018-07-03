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

// describe('/POST /api/shorturl/new', () => {
//   let resSuccessSchema = {
//     type: 'object',
//     required: ['original_url', 'short_url'],
//     properties: {
//       original_url: {
//         type: 'string'
//       },
//       short_url: {
//         type: 'string'
//       }
//     }
//   };

//   it('/POST new url: res schema', done => {
//     chai.request(server)
//       .post('/api/shorturl/new')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.jsonSchema(resSuccessSchema);
//         done();
//       });
//   });
// });
