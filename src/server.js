require('dotenv/config.js');
const dbConn = require('./database/connection');
const app = require('./index.js');

const port = process.env.PORT || 3001;

dbConn().then(() =>
  app.listen(port, () => console.log('Server ON :: %s ::', port))
);
