const getPagination = (qs) => {
  const limit = qs.limit * 1 || 20;
  const page = (qs.page && qs.page > 0 ? qs.page - 1 : 0) * limit;

  if (limit > 100) return { limit: 100, page };

  return { limit, page };
};

/**
 * @param {object} sortBy&orderBy or sb of ctx.query - The query string of url
 *
 * @returns {String} createdAt/-updatedAt
 */
const getSorting = (params) => {
  if (!params || (!params.sortBy && !params.sb)) return null;

  const { sb, ob, sortBy, orderBy } = params;

  if (sb && ob && ob === 'desc') return `-${sb}`;
  if (sb) return sb;

  if (sortBy && orderBy && orderBy === 'desc') return `-${sortBy}`;

  return `${sortBy}`;
};

module.exports = {
  getPagination,
  getSorting,
};
