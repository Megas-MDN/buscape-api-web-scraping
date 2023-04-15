const serviceBscp = require('../services/getBuscapeService');
const serviceML = require('../services/getMLService');
const sortArr = require('../utils/sortArr');
const Search = require('../models/Search');

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

const goSearch = async (q = '', cat = '', web = '') => {
  if (web === 'mercado_livre') return sortArr(await serviceML.getByCat(q, cat));
  if (web === 'buscape') return sortArr(await serviceBscp.getByCat(q, cat));

  const [arrBuscape, arrML] = await Promise.all([
    serviceBscp.getByCat(q, cat),
    serviceML.getByCat(q, cat),
  ]);
  return sortArr([...arrBuscape, ...arrML]);
};

const search = async (req, res, next) => {
  const { q, cat, web } = req.query;
  const { authorization } = req.headers;

  try {
    const data = await Search.findOne({ search: `0${q}${cat}${web}` });
    if (data) {
      console.log('Retrieving search from database');
      const dados = JSON.parse(data.content);
      return res.status(200).send(dados);
    }

    console.log('New search saved in the database');
    const result = await goSearch(q, cat, web);
    if (authorization === process.env.HASH_ATT) {
      const newData = new Search({
        search: `0${q}${cat}${web}`,
        content: JSON.stringify(result),
      });

      await newData.save();
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log('Error no search controller', error);
    next({ message: error.message });
  }
};

module.exports = {
  getAll,
  getByCategoryTV,
  search,
};
