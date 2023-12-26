const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  username = req.body.username;
  password = req.body.password;

  admin = await Admin.findOne({ username: username, password: password });
  if (admin) {
    res.json({ message: "user already exists" });
    return;
  }
  Admin.create({
    username: username,
    password: password,
  });
  res.json({ message: "entry created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign(
        { username: username, password: password },
        process.env.JWT_SECRET
      );
      res.json({ token: token });
    } else {
      throw Error("Please sign up");
    }
  } catch (err) {
    res.status(412).send();
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const {title, description, price, imageLink} = req.body;
  const course = await Course.create({title, description, price, imageLink});
  res.json( { message: 'Course created successfully', courseId: course._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const course = await Course.find();
  res.json(course);
});

module.exports = router;
