const fetchData = require('../utils/fetchBuscape');

const TV = 3;
const CELULAR = 7;
const GELADEIRA = 8;

const idsCat = {
  tv: TV,
  celular: CELULAR,
  geladeira: GELADEIRA,
};

const getAll = async (q = '') => {
  try {
    const [arrTv, arrCel, arrGela] = await Promise.all([
      fetchData(q, idsCat.tv),
      fetchData(q, idsCat.celular),
      fetchData(q, idsCat.geladeira),
    ]);

    return [...arrTv, ...arrCel, ...arrGela];
  } catch (error) {
    console.log('Error getAll Service');
    throw error;
  }
};

const getByCat = async (q = '', cat) => {
  try {
    if (!(cat in idsCat)) return getAll(q);
    return fetchData(q, idsCat[cat]);
  } catch (error) {
    console.log('Error getByCat Service');
    throw error;
  }
};

module.exports = {
  getAll,
  getByCat,
};
