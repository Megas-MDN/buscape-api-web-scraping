const serviceBscp = require('../services/getBuscapeService');
const serviceML = require('../services/getMLService');
const sortArr = require('../utils/sortArr');

const getByCategoryTV = async (req, res, next) => {
  const { q } = req.query;
  try {
    const response = await serviceBscp.getByCatTv(q);
    if (response) return res.status(200).send(response);
    return next({ status: 404, message: 'Products not found!' });
  } catch (error) {
    console.log('Error controller getByCategoryTV');
    return next({ message: error.message });
  }
};

const getAll = async (req, res, next) => {
  const { q } = req.query;
  try {
    const [arrBuscape, arrML] = await Promise.all([
      serviceBscp.getAll(q),
      serviceML.getAll(q),
    ]);

    return res.status(200).send(sortArr([...arrBuscape, ...arrML]));
  } catch (error) {
    console.log('Error controller getAll');
    return next({ message: error.message });
  }
};

module.exports = {
  getAll,
  getByCategoryTV,
};
