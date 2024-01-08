const bcrypt = require("bcrypt");
require("dotenv").config();

function getLoggedInUserId(req) {
  return req.userId || null;
}

async function validatePasswordHash(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function generateHashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

function writeResponse(err, data, res) {
  if (err) {
    res.status(err.code && Number.isInteger(err.code) ? err.code : 500);
    return res.json({
      status: "error",
      message: err.message,
    });
  }
  res.status(200);
  const response = {
    status: "Success",
    data: data,
  };
  return res.json(response);
}

function invoker(promise) {
  return promise
    .then((data) => {
      return [data, null];
    })
    .catch((err) => {
      return [null, err];
    });
}

module.exports = {
  getLoggedInUserId,
  validatePasswordHash,
  generateHashPassword,
  writeResponse,
  invoker,
};
