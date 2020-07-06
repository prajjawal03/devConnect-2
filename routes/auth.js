const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");

//@route  post /user
//@desc   register User
//@access private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "no user found" });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
});
//@route  post /user
//@desc   register User
//@access public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user already exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "invalid credentials" });
    //compare password
    const pass = bcrypt.compare(password, user.password);
    if (!pass) return res.status(400).json({ msg: "invalid credentials" });

    const payload = {
      id: user._id,
    };
    jwt.sign({ payload }, "secret", (err, token) => {
      if (err) throw err;
      res.json({
        token,
        msg: `user logged with id: ${user._id}`,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
