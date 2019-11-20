require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  nRounds: Number(process.env.ROUNDS_N),
  expiresIn: process.env.JWT_VALID,
  secretKey: process.env.JWT_KEY,
};
