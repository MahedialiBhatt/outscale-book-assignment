const jwt = require("jsonwebtoken");
const { writeResponse } = require("../utils/utility");

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      const tokenPayload = jwt.verify(
        req.headers.authorization.split(" ")[1],
        SECRET_KEY
      );
      if (!validPayload(tokenPayload)) {
        return writeResponse(
          {
            code: 403,
            message: "forbidden request",
          },
          null,
          res
        );
      }
      req.userId = tokenPayload["userId"];
    } catch (err) {
      return writeResponse(
        {
          code: 500,
          message: "provided token is not valid or expired",
        },
        null,
        res
      );
    }
    next();
  } else {
    return writeResponse(
      {
        code: 403,
        message: "Token is not provided",
      },
      null,
      res
    );
  }
};

const validPayload = (payload) => {
  if (!payload) return false;
  if (!("userId" in payload)) return false;
  return true;
};

module.exports = {
  verifyToken,
};
