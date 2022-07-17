/* eslint-disable no-param-reassign */
const mongoose = require('lib/mongoose');

const SchemaType = mongoose.Schema.Types;
const { model } = mongoose;

function objectTransformResult(doc, ret) {
  delete ret.createdAt;
  delete ret.updatedAt;

  return ret;
}

function SchemaInstance(md, schemaOpts) {
  const opts = {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: objectTransformResult,
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: objectTransformResult,
    },
    ...schemaOpts,
  };

  return new mongoose.Schema(md, opts);
}

module.exports = { SchemaInstance, SchemaType, model };
