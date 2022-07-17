module.exports = {
  host: process.env.HOST || null, // Let http.Server use its default IPv6/4 host
  port: process.env.PORT || 3000,
};
