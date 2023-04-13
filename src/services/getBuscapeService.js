require('dotenv/config');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs/promises');
const fetchData = require('../utils/fetchBuscape');

const urlBase = process.env.URL_BASE;
const urlBaseSearch = process.env.URL_BASESEARCH;
const urlCat = process.env.URL_CAT;
const TV = 3;
const GELADEIRA = 8;
const CELULAR = 7;

const getByCatTv = async (q = '') => {
  try {
    const response = await fetchData(q, 3);
    return response;
  } catch (error) {
    console.log('Error service getByCatTv');
    throw error;
  }
};

module.exports = {
  getByCatTv,
};
