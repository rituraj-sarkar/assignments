const { Admin } = require("../db/index");
const jwt = require("jsonwebtoken");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    const isBearer = authHeader.split(" ")[0] === "Bearer";
    if (isBearer && token) {
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const admin = await Admin.findOne({ username: decoded.username, password: decoded.password });
        if (admin) {
            next();
        } else {
          console.log('precondition 1');
          throw Error("user not admin");
        }
    } else {
      console.log('precondition 2');
      throw Error("user not admin");
    }
  } catch (err) {
    console.log('final precondition error :: ' + err);
    res.status(412).send();
  }
}

module.exports = adminMiddleware;
