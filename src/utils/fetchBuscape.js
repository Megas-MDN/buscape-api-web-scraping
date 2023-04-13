require('dotenv/config');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs/promises');

const urlBase = process.env.URL_BASE;
const urlBaseSearch = process.env.URL_BASESEARCH;
const urlCat = process.env.URL_CAT;

const getImage = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const $imgs = $('img')
      .get()
      .filter((el) => {
        return (
          $(el).attr('src').includes('https://') &&
          $(el).attr('src').includes('thumbs') &&
          $(el).attr('src').endsWith('.jpg')
        );
      })
      .map((el) => $(el).attr('src'));

    return $imgs[0];
  } catch (error) {
    console.log('Error getImages utils!');
    throw error;
  }
};

const fetchData = async (q = '', cat) => {
  const endpoint = `${urlBaseSearch}${q}${urlCat}${cat}`;

  try {
    const response = await axios(endpoint);
    const $ = cheerio.load(response.data);

    const result = $('.SearchCard_ProductCard__1D3ve')
      .get()
      .map((el) => {
        const obj = { link: urlBase + $(el).find('a').attr('href') };
        obj.altImg = $(el).find('span > img').attr('alt');
        obj.srcImg = $(el)
          .text()
          .split('" decoding="async" ')[0]
          .split('src="')[1];
        obj.desc = $(el)
          .find('.SearchCard_ProductCard_Description__fGXI3')
          .text();
        return obj;
      });

    const resultFinal = await Promise.all(
      result.map(async (el) => {
        if (el.srcImg) return el;
        el.srcImg = await getImage(el.link);
        return el;
      })
    );

    await fs.writeFile(
      './src/database/productsTv.json',
      JSON.stringify(resultFinal, null, 2)
    );
  } catch (error) {
    console.log('Error fetchData utils!');
    throw error;
  }
};

// fetchy('xiaomi', 7);

module.exports = fetchData;
