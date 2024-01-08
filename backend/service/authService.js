const { getNewAccessToken } = require("../utils/authHelper");
const { generateHashPassword } = require("../utils/utility");

const User = require("../models/user");

async function getUserByUsername(username) {
  try {
    const user = await User.findOne({ username });
    return user || null;
  } catch (error) {
    return null;
  }
}

async function register(username, password) {
  try {
    const newPassword = generateHashPassword(password);
    const newUser = new User({
      username,
      password: (await newPassword).toString(),
    });
    await newUser.save();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function makeLoginResponse(user) {
  const tokenPayLoad = {
    userId: user._id,
  };

  const accessToken = getNewAccessToken(tokenPayLoad);

  return Object.assign({}, { userId: user.id }, { accessToken: accessToken });
}

module.exports = { register, getUserByUsername, makeLoginResponse };
