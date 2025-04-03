const express = require("express");
const router = express.Router();
const {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  softDeleteProfile,
  addExperience,
  deleteExperience,
  addSkill,
  deleteSkill,
  updateInformation,
  addFriend,
  deleteFriend,
} = require("./controller");

router.get("/profiles", getAllProfiles);

router.get("/profiles/:id", getProfileById);

router.post("/profiles", createProfile);

router.put("/profiles/:id", updateProfile);

router.delete("/profiles/:id", softDeleteProfile);

router.post("/profiles/:id/experience", addExperience);

router.delete("/profiles/:id/experience/:exp", deleteExperience);

router.post("/profiles/:id/skills", addSkill);

router.delete("/profiles/:id/skills/:skill", deleteSkill);

router.put("/profiles/:id/information", updateInformation);

router.post("/profiles/:id/friends/", addFriend);

router.delete("/profiles/:id/friends/:friendId", deleteFriend);

module.exports = router;
