const { User } = require("../db/index");
const jwt = require("jsonwebtoken");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        const token = authHeader.split(" ")[1];
        const isBearer = authHeader.split(" ")[0] === "Bearer";
        if (isBearer && token) {
            console.log(process.env.JWT_SECRET);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            const user = await User.findOne({ username: decoded.username, password: decoded.password });
            if (user) {
                req.user=user.username;
                next();
            } else {
                throw Error("user not logged in, please sign up");
            }
        }
      } catch (err) {
        res.status(412).send();
      }
}

module.exports = userMiddleware;