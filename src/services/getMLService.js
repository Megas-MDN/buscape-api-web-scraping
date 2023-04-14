require('dotenv/config');
const axios = require('axios');

const URL_BASE = process.env.URL_ML; //https://api.mercadolibre.com/sites/MLB/search?limit=48&q= &category=

const CELULAR = 'MLB1055';
const TV = 'MLB1002';
const GELADEIRA = 'MLB181294';

const idsCat = {
  tv: TV,
  celular: CELULAR,
  geladeira: GELADEIRA,
};

const formatObj = (element) => ({
  link: element.permalink,
  altImg: 'Imagem de ' + element.title,
  srcImg: element.thumbnail,
  desc: element.attributes.map((el) => el.name + ' ' + el.value_name).join(' '),
  price: element.price,
  source: 'mercado_livre',
});

const getAll = async (q = '') => {
  const cat = '&category=';
  const arrResults = await Promise.all([
    axios.get(`${URL_BASE}${q}${cat + CELULAR}`),
    axios.get(`${URL_BASE}${q}${cat + TV}`),
    axios.get(`${URL_BASE}${q}${cat + GELADEIRA}`),
  ]);

  const [arrCel, arrTv, arrGeladeira] = arrResults.map((el) =>
    el.data.results.map((el) => formatObj(el))
  );

  return [...arrCel, ...arrTv, ...arrGeladeira];
};

const getByCat = async (q = '', category) => {
  const cat = '&category=';
  try {
    if (!(category in idsCat)) return getAll(q);
    const response = await axios.get(
      `${URL_BASE}${q}${cat + idsCat[category]}`
    );
    return response.data.results.map((el) => formatObj(el));
  } catch (error) {
    console.log('Error getByCat Service');
    throw error;
  }
};

module.exports = { getAll, getByCat };
