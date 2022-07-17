const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  format: String,
  url: String,
  filename: String,
});

module.exports = mediaSchema;
