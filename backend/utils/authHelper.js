const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRE_TIME } = process.env;

function getNewAccessToken(options) {
  const token = jwt.sign(options, ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME,
  });
  return token;
}

function isValidToken(token) {
  try {
    jwt.verify(token, "secret");
    return true;
  } catch (err) {
    return false;
  }
}

function getTokenData(token) {
  try {
    return jwt.verify(token, "secret");
  } catch (err) {
    return null;
  }
}

module.exports = {
  getNewAccessToken,
  isValidToken,
  getTokenData,
};
