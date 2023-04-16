# API buscape Web scraping

This API provides a web scraping solution to obtain product data from the Buscapé website. With the API, it is possible to extract information such as product name, price, description, and image by searching for a specific term.

This API serves the frontend available at this address: [Repo-frontend](https://github.com/Megas-MDN/product-search)

<hr>

## Application flow

The API accepts a GET request at the route '/', and the response is a JSON object containing the key "source" with a value of "web" or "database". The other key is "results", which has an array with the results of all products summed from three categories (celular, tv e geladeira) of two stores (Buscapé and Mercado Livre).

Another possible route is '/search?' that accepts three query parameters: q = search for a term, cat = search in a category (celular, tv e geladeira), and web = filter the results between Buscapé or Mercado Livre store.

For example, a valid one is: /search?q=iphone&cat=celular&web=buscape. In this case, the API checks if this search has been previously performed. If so, it returns the result from the database within the 'results' key and the 'source': 'database' key.

Otherwise, the API checks if the access key sent in the request header matches the internal key. Only if the keys match, the API stores the search results in the database.

The application has integration and unit tests of the main functionalities.

![Tests](https://i.imgur.com/eKw4I5k.png)

<hr>

## 🧐 Features

- Retrieval of product information from the online platforms Buscapé and Mercado Livre.

- Verification of secret authentication key sent by the frontend to prevent malicious queries.

- Storage of search results in the database if the secret key matches, otherwise sending the results without storage.

- Search for results in the database if the search has been previously performed with the same fields.

- Sending the search results to the frontend.

<hr>

## 🛠️ Install project

1. Clone the repository

```bash
git clone https://github.com/Megas-MDN/buscape-api-web-scraping.git
```

2. Enter the cloned folder

```bash
cd buscape-api-web-scraping
```

3. Install the dependencies

```bash
npm install
```

4. Run the project production mode

```bash
npm start
```

5. Run in development mode

```bash
npm run dev
```

6. Run in tests

```bash
npm run test
```

<hr>

## 📦 Environment variables

To run this project, you will need to add the following environment variables to your .env

`URL_BASE`= Base URL for Buscapé web scraping

`URL_BASESEARCH`= Base URL for searching in Buscapé web scraping database

`URL_CAT`= Base URL for categories in Mercado Livre

`URL_ML`= Base URL for Mercado Livre search

`URL_ML_CAT`= Base URL for searching categories in Mercado Livre

`CAT_ML_CEL`= ID for the cell phone category

`CAT_ML_GELADEIRA`= ID for the refrigerator category

`CAT_ML_TV`= ID for the television category

`PASS_DB`= Database password

`USER_DB`= Database username

`HASH_ATT`= Update hash

🌟 Ready to use!

<hr>

## 💻 Deploy

<hr>

## 💻 Built with:

- [javascript](https://www.w3schools.com/js/js_es6.asp) : Language
- [Nodejs](https://nodejs.org/en) : Engine
- [Express](https://expressjs.com/) : Framework api
- [Cheerio](https://cheerio.js.org/) : Web scraping
- [Mongo DB Atlas](https://www.mongodb.com/atlas/database) : Data base
- [Chai](https://www.chaijs.com/) : Tests
- [Railway](https://railway.app/) : Deploy

<hr>
<p align="center">
Developed with ❤️ by Megas
</p>
