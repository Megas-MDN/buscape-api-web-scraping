const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  search: {
    unique: true,
    type: String,
  },
  content: String,
});

module.exports = mongoose.model('Search', schema);
