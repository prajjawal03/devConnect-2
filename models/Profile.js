const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
});
module.exports = Profile = mongoose.model("profile", profileSchema);
