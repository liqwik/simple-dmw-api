const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
  },
  coord: {
    type: [Number], // [lng, lat] - Note that longitude comes first in a GeoJSON coordinate array, not latitude.
  },
});

module.exports = pointSchema;
