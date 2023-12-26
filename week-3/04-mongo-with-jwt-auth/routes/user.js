const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  username = req.body.username;
  password = req.body.password;

  user = await User.findOne({ username: username, password: password });
  if (user) {
    res.json({ message: "user already exists" });
    return;
  }
  User.create({
    username: username,
    password: password,
  });
  res.json({ message: "entry created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign(
        { username: username, password: password },
        process.env.JWT_SECRET
      );
      res.json({ token: token });
    } else {
      throw Error("Please sign up");
    }
  } catch (err) {
    console.log("/user/signin error :: " + err);
    res.status(412).send();
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const course = await Course.find();
  res.json(course);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.user;
  try {
    console.log(req.params.courseId);
    const course = await Course.findOne({ _id: req.params.courseId }).exec();
    console.log(course);
    const UpdatedUser = await User.findOneAndUpdate(
      {
        username: username,
      },
      {
        $push: { purchasedCourses: course },
      }
    );

    res.json({ message: "Course Purchased Succesfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const username = req.user;
    user = await User.findOne({ username: username});
    console.log(user.purchasedCourses);
    let courses = await Course.find({
      _id: { $in: user.purchasedCourses },
    }).exec();
    console.log(courses);
    res.json(courses);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
