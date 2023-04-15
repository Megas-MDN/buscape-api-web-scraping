const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/index.js');

const { expect } = chai;

chai.use(chaiHttp);

const yesNotIncludes = (arrStr, products = []) => {
  const arrNotincludes = products.filter(
    (el) => !arrStr.some((str) => el.altImg.toLocaleLowerCase().includes(str))
  );
  const yesIncludes = products.length - arrNotincludes.length;
  return [yesIncludes, arrNotincludes.length];
};

describe('Integration test, search products', function () {
  describe('Usando o método GET em /search', function () {
    it('Returning the list with products only from the free marke!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=&cat=&web=mercado_livre');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(0);
      const onlyMl = response.body.every(
        ({ source }) => source === 'mercado_livre'
      );
      expect(onlyMl).to.be.equal(true);
    }).timeout(100000);

    it('Returns the complete list of products!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=&cat=&web=buscape');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(0);
      const onlyMl = response.body.every(({ source }) => source === 'buscape');
      expect(onlyMl).to.be.equal(true);
    }).timeout(100000);

    it('Returns a list of products TV!', async function () {
      const response = await chai.request(app).get('/search?q=&cat=tv&web=');

      expect(response.status).to.be.equal(200);

      const [yesIncludes, notIncludes] = yesNotIncludes(['tv'], response.body);

      expect(yesIncludes).to.greaterThan(notIncludes);
    }).timeout(100000);

    it('Returns a list of products Celular!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=&cat=celular&web=');

      expect(response.status).to.be.equal(200);

      const [yesIncludes, notIncludes] = yesNotIncludes(
        [
          'phone',
          'xiaomi',
          'multilaser',
          'moto',
          'galaxy',
          'positivo',
          'lg',
          'l8star',
        ],
        response.body
      );

      expect(yesIncludes).to.greaterThan(notIncludes);
    }).timeout(100000);

    it('Returns a list of products geladeira!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=&cat=geladeira&web=');

      expect(response.status).to.be.equal(200);

      const [yesIncludes, notIncludes] = yesNotIncludes(
        [
          'geladeira',
          'frost',
          'consul',
          'electrolux',
          'defrost',
          'panasonic',
          'duplex',
          'brastemp',
        ],
        response.body
      );

      expect(yesIncludes).to.greaterThan(notIncludes);
    }).timeout(100000);

    it('Returns a list of products Iphone!', async function () {
      const response = await chai
        .request(app)
        .get('/search?q=/^iphone*!<>/&cat=&web=');

      expect(response.status).to.be.equal(200);

      const [yesIncludes, notIncludes] = yesNotIncludes(
        ['iphone'],
        response.body
      );

      expect(yesIncludes).to.greaterThan(notIncludes);
      const onlyMl = response.body.some(
        ({ source }) => source === 'mercado_livre'
      );
      const onlyBscp = response.body.some(({ source }) => source === 'buscape');
      expect(onlyMl).to.be.equal(true);
      expect(onlyBscp).to.be.equal(true);
    }).timeout(100000);
  });
});
