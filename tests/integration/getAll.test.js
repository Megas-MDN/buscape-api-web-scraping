const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../src/index.js');

const { expect } = chai;

chai.use(chaiHttp);

describe('Integration test, getting all products', function () {
  describe('Using the GET method on /', function () {
    it('Returns the complete list of products!', async function () {
      const response = await chai.request(app).get('/');

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.greaterThan(200);
    }).timeout(100000);
  });
});
