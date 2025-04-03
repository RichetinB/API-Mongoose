const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  experience: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      title: { type: String, required: true },
      company: { type: String, required: true },
      dates: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  information: {
    bio: { type: String },
    location: { type: String },
    website: { type: String },
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
