require('dotenv/config.js');
const app = require('./index.js');

const port = process.env.PORT || 3001;

app.listen(port, () => console.log('Server ON :: %s ::', port));
