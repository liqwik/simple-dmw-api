const BaseCRUDService = require('app/services/shared/base-crud-service');
const {
  transformToKhNum,
  transformToEnNum,
} = require('app/utils/transformer-util');

const DocumentService = function ({ documentRepo }) {
  return {
    ...BaseCRUDService({
      repository: documentRepo,
    }),

    getList: async ({ filter, search }, { limit, page, sort, select }) => {
      let match = {};

      if (search) {
        const getKhmerNumber = transformToKhNum(search);
        const getEnglishNumber = transformToEnNum(search);

        const searchValue = new RegExp(search, 'i');
        let searchNumberValue = searchValue;

        if (getKhmerNumber) {
          searchNumberValue = new RegExp(getKhmerNumber, 'i');
        }

        if (!getKhmerNumber && getEnglishNumber) {
          searchNumberValue = new RegExp(getEnglishNumber, 'i');
        }

        match = {
          $or: [
            {
              docNo: { $in: [searchValue, searchNumberValue] },
            },
            { 'docIn.no': { $in: [searchValue, searchNumberValue] } },
          ],
        };
      }

      if (filter.docStart && filter.docEnd) {
        match = {
          ...match,
          docDate: {
            $gte: new Date(filter.docStart * 1000),
            $lte: new Date(filter.docEnd * 1000),
          },
        };

        delete match.docStart;
        delete match.docEnd;
      }

      if (filter.isSign) {
        match = {
          ...match,
          isSign: !!(filter.isSign * 1),
        };
      }
      if (filter.status) {
        match = {
          ...match,
          docStatus: filter.status,
        };
      }

      const data = await documentRepo.model
        .find(match)
        .skip(page)
        .limit(limit)
        .sort(sort)
        .select(select)
        .populate('institutionId', 'name')
        .populate('docTypeId', 'name')
        .populate('docIn.sender', 'fn ln')
        .populate('docIn.receiver', 'fn ln')
        .populate('docOut.sender', 'fn ln')
        .populate('docOut.receiver', 'fn ln');

      if (!data || data.length === 0) return [];

      return data;
    },

    getDetail: async (id) => {
      const data = await documentRepo.model
        .findById(id)
        .populate('docIn.sender', 'fn ln')
        .populate('docIn.receiver', 'fn ln')
        .populate('docOut.sender', 'fn ln')
        .populate('docOut.receiver', 'fn ln');

      if (!data) return null;

      return data;
    },
  };
};

module.exports = DocumentService;
