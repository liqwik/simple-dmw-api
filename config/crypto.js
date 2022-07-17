module.exports = {
  alg: process.env.CRYPTO_ALG || '',
  secretKey: process.env.CRYPTO_KEY || '',
  iv: process.env.CRYPTO_IV || '',
};
