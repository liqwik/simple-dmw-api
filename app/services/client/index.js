/* eslint-disable strict */

'use strict';

const repository = require('app/repos');
const DocumentService = require('./document-service');

module.exports = {
  documentService: DocumentService({ documentRepo: repository.documentRepo }),
};
