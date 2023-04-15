const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/index.js');

const { expect } = chai;

chai.use(chaiHttp);

describe('Integration test, search products', function () {
  describe('Usando o método GET em /search', function () {
    it('Returns the complete list of products!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=&cat=&web=mercado_livre');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(200);
    }).timeout(100000);

    it('Returns the complete list of products!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=&cat=&web=buscape');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(200);
    }).timeout(100000);

    it('Returns the complete list of products!', async function () {
      const response = await chai.request(app).get('/search?q=&cat=tv&web=');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(200);
    }).timeout(100000);

    it('Returns the complete list of products!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=&cat=celular&web=');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(200);
    }).timeout(100000);

    it('Returns the complete list of products!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=&cat=geladeira&web=');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(200);
    }).timeout(100000);

    it('Returns the complete list of products!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=/iphone/&cat=&web=');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(200);
    }).timeout(100000);
  });
});
