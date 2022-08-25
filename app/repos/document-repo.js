const BaseRepository = require('app/repos/base-repository');

const DocumentRepository = function ({ model }) {
  return {
    ...BaseRepository(model),

    countDocByStatus: (start, end) => {
      const match = {
        $match: {
          isActive: true,
          'docIn.date': { $gte: new Date(start), $lt: new Date(end) },
        },
      };

      const group = {
        $group: {
          _id: {
            docStatus: '$docStatus',
            sign: '$isSign',
          },
          totalDoc: { $sum: 1 },
        },
      };

      return model.aggregate([match, group]);
    },

    countDocByDocType: (start, end) => {
      const match = {
        $match: {
          isActive: true,
          'docIn.date': { $gte: new Date(start), $lt: new Date(end) },
        },
      };

      const group = {
        $group: {
          _id: {
            docType: '$docTypeId',
            docStatus: '$docStatus',
            sign: '$isSign',
          },
          totalDoc: { $sum: 1 },
        },
      };

      return model.aggregate([match, group]);
    },
  };
};

module.exports = DocumentRepository;
