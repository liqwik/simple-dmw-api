module.exports = {
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'home_delivery',
  port: process.env.DB_PORT || '27017',
  conn: process.env.DB_CONN || '',
};
