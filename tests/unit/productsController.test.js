require('dotenv/config');
const serviceML = require('../../src/services/getMLService');
const serviceBscp = require('../../src/services/getBuscapeService');
const Search = require('../../src/models/Search');
const productsController = require('../../src/controllers/productsController');
const { getAll, mockML, mockBscp } = require('./mocks/data');

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect, assert } = require('chai');

chai.use(sinonChai);

const res = {};
const req = {};
const next = (params) => params;

describe('Testing the controller layer', function () {
  describe('Unit test with service layer simulation', function () {
    beforeEach(function () {
      res.status = sinon.stub().returns(res);
      res.send = (params) => params;
    });

    it('Testing to get all products', async function () {
      req.query = { q: '' };

      sinon.stub(serviceML, 'getAll').resolves(mockML);
      sinon.stub(serviceBscp, 'getAll').resolves(mockBscp);

      const result = await productsController.getAll(req, res, next);

      expect(res.status).to.have.been.calledWith(200);
      [...mockML, , ...mockBscp].forEach((prod) => {
        expect(result.results).to.deep.include(prod);
      });
    });

    it('Testing fail to get all products', async function () {
      req.query = { q: '' };

      sinon
        .stub(serviceML, 'getAll')
        .throws(new Error('Unable to pick up products'));
      sinon
        .stub(serviceBscp, 'getAll')
        .throws(new Error('Unable to pick up products'));

      const result = await productsController.getAll(req, res, next);

      expect(result).to.haveOwnProperty('message');
      expect(result.message).to.be.equal('Unable to pick up products');
    });

    it('Testing the product search from web', async function () {
      const saveSpy = sinon.stub(Search.prototype, 'save');
      const searchStub = sinon.stub();
      searchStub.returns({ save: saveSpy });

      req.query = { q: '', cat: 'celular', web: 'buscape' };
      req.headers = { authorization: process.env.HASH_ATT };
      sinon.stub(Search, 'findOne').resolves();

      sinon.stub(serviceBscp, 'getByCat').resolves(mockBscp);

      const result = await productsController.search(req, res, next);
      expect(saveSpy.calledOnce).to.be.true;

      mockBscp.forEach((prod) => {
        expect(result.results).to.deep.include(prod);
      });
    });

    it('Testing the product search from base', async function () {
      sinon
        .stub(Search, 'findOne')
        .resolves({ content: JSON.stringify(mockML) });

      req.query = { q: '', cat: 'tv', web: 'mercado_livre' };
      req.headers = { authorization: '' };

      const result = await productsController.search(req, res, next);

      expect(result).to.be.deep.equal({
        source: 'database',
        results: mockML,
      });
    });

    it('Testing product search failure on the web', async function () {
      const saveSpy = sinon.stub(Search.prototype, 'save');
      const searchStub = sinon.stub();
      searchStub.returns({ save: saveSpy });

      req.query = { q: '', cat: 'celular', web: 'buscape' };
      req.headers = { authorization: '' };
      sinon
        .stub(Search, 'findOne')
        .throws(new Error('Error connecting to database'));

      const result = await productsController.search(req, res, next);

      expect(result).to.haveOwnProperty('message');
      expect(result.message).to.be.deep.equal('Error connecting to database');
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
