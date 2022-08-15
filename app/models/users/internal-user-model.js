/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
const mongoose = require('lib/mongoose');
const validator = require('lib/validator');
const { mediaSchema, pointSchema } = require('lib/mongoose/custom-schema');

const { Schema } = mongoose;

const schema = new Schema(
  {
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
    usr: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 50,
    },
    em: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: 6,
      maxlength: 255,
      validate: (value) => validator.isEmail(value),
    },
    ph: {
      type: String,
      trim: true,
      validate: {
        validator: () => {},
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    pwd: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [6, 'Password need to be longer!'],
    },
    sex: {
      type: String,
      maxlength: 1,
    },
    dob: {
      type: Date,
    },
    roles: [
      {
        type: String,
        enum: ['SUPER_ADMIN', 'ADMIN', 'OFFICER', 'ASSISTANT'],
      },
    ],
    isLocked: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cPic: mediaSchema,
    pPic: mediaSchema,
    loc: {
      type: pointSchema,
    },
  },
  {
    timestamps: true,
    collection: 'internal_users',
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        const fakeRole = {
          SUPER_ADMIN: 'Administrator',
          ADMIN: 'Admin',
          OFFICER: 'Officer',
        };

        ret.userType = fakeRole[ret.roles[0]];

        delete ret.roles;
        delete ret.pwd;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret.pwd;
      },
    },
  }
);

schema.index({ usr: 1 }, { sparse: true, unique: true });
schema.index({ em: 1 }, { sparse: true, unique: true });

module.exports = mongoose.model('InternalUser', schema);
