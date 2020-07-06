const router = require("express").Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

//@route   get /profile/me
//@desc    get current profile
//@access  private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);
    if (!profile) return res.status(400).json({ msg: "no profile found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "inetrnal server error" });
  }
});

//@route   post /profile
//@desc    create profile
//@access  private
router.post("/", auth, async (req, res) => {
  const { skills, bio } = req.body;
  //creating profileFields
  const profileFields = {};
  if (bio) profileFields.bio = bio;
  if (skills)
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  try {
    //find profile and update or create new
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal Server Error");
  }
});

//@route   get /profile
//@desc    get all profile
//@access  public
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name"]);
    if (!profile) return res.status(400).json({ msg: "no profile found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal Server Error");
  }
});

//@route   get /profile/user/:_id
//@desc    get profile by /:id
//@access  public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);
    if (!profile) return res.status(400).json({ msg: "no profile found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Profile not found" });
    res.status(500).send("internal Server Error");
  }
});

//@route   delete /profile
//@desc    delete profile
//@access  private
router.delete("/", auth, async (req, res) => {
  try {
    //delete profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //delete user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: `profile deleted of id: ${req.user.id}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal Server Error");
  }
});
module.exports = router;
