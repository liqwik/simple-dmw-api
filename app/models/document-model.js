const { SchemaInstance, SchemaType, model } = require('lib/mongoose/schema');

const schema = SchemaInstance({
  institutionId: {
    type: SchemaType.ObjectId,
    ref: 'Institution',
  },
  docTypeId: {
    type: SchemaType.ObjectId,
    ref: 'DocType',
  },
  docNo: {
    type: String,
    trim: true,
  },
  docDate: {
    type: Date,
  },
  docLunarDate: {
    type: String,
  },
  docDescription: {
    type: String,
  },
  docIn: {
    no: String,
    date: Date,
    senderDate: Date,
    receiverDate: Date,
    sender: {
      type: SchemaType.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: SchemaType.ObjectId,
      ref: 'User',
    },
  },
  docOut: {
    date: Date,
    senderDate: Date,
    receiverDate: Date,
    sender: {
      type: SchemaType.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: SchemaType.ObjectId,
      ref: 'User',
    },
  },
  signDate: {
    type: Date,
  },
  signRemark: {
    type: String,
  },
  docStatus: {
    type: String,
    enum: ['normal', 'signature', 'urgent'],
  },
  isSign: {
    type: Boolean,
    default: false,
  },
  issueDate: {
    type: Date,
  },
  remark: {
    type: String,
  },
  resourceLink: {
    type: String,
    trim: true,
  },
  isEditable: {
    type: Boolean,
    default: true,
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
});

schema.index({ docNo: 1 });
schema.index({ docNo: 1, 'docIn.no': 1 });
schema.index({ 'docIn.date': 1, isActive: 1 });

module.exports = model('Document', schema);
