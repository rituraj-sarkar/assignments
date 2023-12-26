const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
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
