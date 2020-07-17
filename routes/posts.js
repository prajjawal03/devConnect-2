const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

//@route  post /posts
//@desc   create post
//@access private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = new Post({
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
});

//@route  get /posts
//@desc   get all post
//@access public
router.get("/", async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    if (!post) return res.status(404).json({ msg: "no post found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
});

//@route  get /posts/post/:post_id
//@desc   get post by id
//@access public
router.get("/post/:post_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "no post found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    res.status(500).send("internal Server Error");
  }
});

//@route  delete /posts/:post_id
//@desc   delete post by id
//@access priavte
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "no post found " });
    //confirm User
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });
    await post.remove();
    res.json({ msg: "post deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    res.status(500).send("internal Server Error");
  }
});

//@route  delete /posts/
//@desc   delete all posts
//@access priavte
// router.delete("/", auth, async (req, res) => {
//   try {
//     const post = await Post.find({ user: req.user.id });
//     if (!post) return res.status(404).json({ msg: "no post found " });
//     await post.remove();
//     res.json({ msg: "posts deleted" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "internal server error" });
//   }
// });

module.exports = router;
