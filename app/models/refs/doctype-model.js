const { SchemaInstance, SchemaType, model } = require('lib/mongoose/schema');

const schema = SchemaInstance(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: SchemaType.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: SchemaType.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: false,
  }
);

schema.index({ code: 1 });

module.exports = model('DocType', schema);
