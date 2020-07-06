const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//@route  post /user
//@desc   register User
//@access private
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check if user already exists
    const uemail = await User.findOne({ email });
    if (uemail) return res.status(400).json({ msg: "user already exists" });
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hash,
    });
    await user.save();
    const payload = {
      id: user._id,
    };
    jwt.sign({ payload }, "secret", (err, token) => {
      if (err) throw err;
      res.json({
        token,
        msg: `user registered with id: ${user._id}`,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
