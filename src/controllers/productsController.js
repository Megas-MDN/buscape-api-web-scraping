const service = require('../services/getBuscapeService');

const getByCategoryTV = async (req, res, next) => {
  const { q } = req.query;
  try {
    const response = await service.getByCatTv(q);
    if (response) return res.status(200).send(response);
    return next({ status: 404, message: 'Products not found!' });
  } catch (error) {
    console.log('Error controller getByCategoryTV');
    return next({ message: error.message });
  }
};

module.exports = {
  getByCategoryTV,
};
