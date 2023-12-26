const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const {username, password} = JSON.parse(req.headers.credentials);
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  const admin = await User.findOne({ username, password });
  if (!admin) {
    res.json({ msg: "username or password is not correct" });
    return;
  }
  next();
}

module.exports = userMiddleware;