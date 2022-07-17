const { cryptoConfig } = require('config');
const crypto = require('crypto');
const { sessionDB } = require('lib/redis');

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    cryptoConfig.alg,
    cryptoConfig.secretKey,
    iv
  );

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  const encryptedHex = encrypted.toString('hex');
  const ivHex = iv.toString('hex');

  sessionDB.setex(encryptedHex, 300, ivHex);

  return encryptedHex;
};

const decrypt = async (content) => {
  const iv = await sessionDB.get(content);

  if (!iv) return null;

  const decipher = crypto.createDecipheriv(
    cryptoConfig.alg,
    cryptoConfig.secretKey,
    Buffer.from(iv, 'hex')
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
