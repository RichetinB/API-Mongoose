const Profile = require("./model");

const getAllProfiles = async (req, res) => {
  try {
    const { skills, location, name, email } = req.query;

    const filter = {};

    if (skills) {
      filter.skills = { $in: skills.split(",") };
    }
    if (location) {
      filter["information.location"] = { $regex: location, $options: "i" };
    }
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }

    const profiles = await Profile.find(filter);

    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("friends");
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau profil
const createProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newProfile = new Profile({ name, email });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour un profil
const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un profil par ID (Soft-Delete)
const softDeleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile soft-deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajouter une expérience à un profil
const addExperience = async (req, res) => {
  const { title, company, dates, description } = req.body;
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    profile.experience.push({ title, company, dates, description });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une expérience d'un profil
const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const experienceIndex = profile.experience.findIndex(
      (exp) => exp._id.toString() === req.params.exp
    );
    if (experienceIndex === -1) {
      return res.status(404).json({ message: "Experience not found" });
    }
    profile.experience.splice(experienceIndex, 1);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Ajouter une compétence à un profil
const addSkill = async (req, res) => {
  const { skill } = req.body;
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    profile.skills.push(skill);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une compétence d'un profil
const deleteSkill = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const skillIndex = profile.skills.indexOf(req.params.skill);
    if (skillIndex === -1) {
      return res.status(404).json({ message: "Skill not found" });
    }
    profile.skills.splice(skillIndex, 1);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour les informations d'un profil
const updateInformation = async (req, res) => {
  const { bio, location, website } = req.body;
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        "information.bio": bio,
        "information.location": location,
        "information.website": website,
      },
      { new: true }
    );
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addFriend = async (req, res) => {
  const { friendId } = req.body;
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    profile.friends.push(friendId);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile || profile.deletedAt) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const friendIndex = profile.friends.indexOf(req.params.friendId);
    if (friendIndex === -1) {
      return res.status(404).json({ message: "Friend not found" });
    }
    profile.friends.splice(friendIndex, 1);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addFriend,
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
  deleteFriend,
};
