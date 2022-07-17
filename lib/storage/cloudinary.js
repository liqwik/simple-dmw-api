const cloudinary = require('cloudinary').v2;
const { cloud } = require('config');

cloudinary.config({
  cloud_name: cloud.name,
  api_key: cloud.apiKey,
  api_secret: cloud.apiSecret,
});

module.exports = cloudinary;
