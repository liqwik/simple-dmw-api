const _ = require('lodash');

const ReportService = function ({ docRepo, docTypeRepo }) {
  return {
    getTotalDocByStatus: async (startDate, endDate) => {
      const totalDoc = await docRepo.countDocByStatus(startDate, endDate);

      return totalDoc;
    },

    getTotalDocByDocType: async (startDate, endDate) => {
      const totalDoc = await docRepo.countDocByDocType(startDate, endDate);

      const totalDocTransform = totalDoc.reduce((prev, curr) => {
        const { docType, docStatus, sign } = curr._id;
        const signKey = sign ? 'signed' : 'not_sign';
        const docKey = `${docType}.${signKey}.${docStatus}`;

        if (_.get(prev, docKey)) {
          prev[docKey] += curr.totalDoc;
        } else {
          _.set(prev, docKey, curr.totalDoc);
        }

        return prev;
      }, {});

      const docTypeList = await docTypeRepo.findAll(
        { isActive: true },
        { select: '_id name code' }
      );
      const result = docTypeList.map((docType) => ({
        ...docType.toJSON(),
        totalDoc: totalDocTransform[docType._id] || null,
      }));

      return result;
    },
  };
};

module.exports = ReportService;
