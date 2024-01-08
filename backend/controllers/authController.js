const {
  invoker,
  writeResponse,
  validatePasswordHash,
} = require("../utils/utility");
const authService = require("../service/authService");

async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return writeResponse({ code: 400, message: "Bad Request" }, null, res);
  }

  const [isUserExist, err0] = await invoker(
    authService.getUserByUsername(username)
  );

  if (err0) {
    return writeResponse(
      { code: 500, message: "Something went wrong while fetching user." },
      null,
      res
    );
  }

  if (isUserExist) {
    return writeResponse(
      {
        code: 409,
        message:
          "Sorry, that username is already taken. Please choose a different username.",
      },
      null,
      res
    );
  }

  const [response, err] = await invoker(
    authService.register(username, password)
  );

  if (err) {
    return writeResponse(
      { code: 500, message: "Something went wrong while registering user." },
      null,
      res
    );
  }

  return writeResponse(null, response, res);
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return writeResponse({ code: 400, message: "Bad Request" }, null, res);
  }

  const [user, err] = await invoker(authService.getUserByUsername(username));

  if (err) {
    return writeResponse(
      {
        code: 500,
        message: "Something went wrong while generating login response.",
      },
      null,
      res
    );
  }

  if (!user) {
    return writeResponse(
      { code: 401, message: "Invalid username or password" },
      null,
      res
    );
  }

  const isMatch = await validatePasswordHash(password, user.password);

  if (!isMatch) {
    return writeResponse(
      { code: 400, message: "Invalid username or password" },
      null,
      res
    );
  }

  const response = authService.makeLoginResponse(user);

  if (!response) {
    return writeResponse(
      {
        code: 500,
        message: "Something went wrong while generating login response.",
      },
      null,
      res
    );
  }

  return writeResponse(null, response, res);
}

module.exports = { register, login };
