const express = require('express');
const dbConn = require('./database/connection');
const cors = require('cors');
const router = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
dbConn();
module.exports = app;
