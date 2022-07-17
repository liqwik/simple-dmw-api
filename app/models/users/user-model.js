const mongoose = require('lib/mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    title: {
      type: String,
    },
    fn: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    ln: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    ph: {
      type: String,
      trim: true,
    },
    sex: {
      type: String,
      maxlength: 1,
      enum: ['f', 'm', 'o'],
      default: 'o',
    },
    userType: {
      type: String,
      enum: ['assistant', 'other'],
      default: 'other',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    toObject: {
      virtuals: true,
      versionKey: false,
    },
  }
);

schema.index({ em: 1 }, { sparse: true, unique: true });
schema.index({ ph: 1 }, { sparse: true, unique: true });

module.exports = mongoose.model('User', schema);
