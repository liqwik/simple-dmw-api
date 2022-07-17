const { getSearchQuery } = require('app/utils/querystring-util');

const DocumentService = function ({ documentRepo }) {
  return {
    getList: async (
      { filter, search, searchFields },
      { limit, page, sort, select }
    ) => {
      const searchQuery = getSearchQuery(search, searchFields);
      let match = { ...searchQuery };

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

    count: async ({ filter, search, searchFields }) => {
      const searchQuery = getSearchQuery(search, searchFields);
      const match = { ...filter, ...searchQuery };

      const result = await documentRepo.count(match);

      return result;
    },
  };
};

module.exports = DocumentService;
