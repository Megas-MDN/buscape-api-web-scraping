const serviceBscp = require('../services/getBuscapeService');
const serviceML = require('../services/getMLService');
const sortArr = require('../utils/sortArr');
const Search = require('../models/Search');

const getAll = async (req, res, next) => {
  const { q } = req.query;
  try {
    const [arrBuscape, arrML] = await Promise.all([
      serviceBscp.getAll(q),
      serviceML.getAll(q),
    ]);

    return res.status(200).send({
      source: 'web',
      results: sortArr([...arrBuscape, ...arrML]),
    });
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
  const { q: qry, cat, web } = req.query;
  const { authorization } = req.headers;
  const q = qry
    ? qry.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
    : '';

  try {
    const data = await Search.findOne({ search: `0${q}${cat}${web}` });
    if (data) {
      console.log('Retrieving search from database');
      const dados = JSON.parse(data.content);
      return res.status(200).send({ source: 'database', results: dados });
    }

    console.log('New search saved in the database');
    const results = await goSearch(q, cat, web);
    if (authorization === process.env.HASH_ATT) {
      const newData = new Search({
        search: `0${q}${cat}${web}`,
        content: JSON.stringify(results),
      });

      await newData.save();
    }
    return res.status(200).send({ source: 'web', results });
  } catch (error) {
    console.log('Error search controller');
    return next({ message: error.message });
  }
};

module.exports = {
  getAll,
  search,
};
