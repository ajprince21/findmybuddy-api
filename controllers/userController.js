const User = require("../models/users");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { userId, ...updates } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};

// Get All Available Users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // Currently Here Im modifying response , Just making It like Chat list :Later on I will Update It Again
    const chatList = users.map((user) => {
      const userdata = {
        _id: user._id,
        name: user.first_name || "Ajay Temp name",
        lastMessage: "Can we meet tomorrow?",
        time: user.updated_at,
        unreadCount: 0,
        avatarUrl: user.avatarUrl || "https://i.pravatar.cc/150",
      };
      return userdata;
    });
    res.json(chatList);
  } catch (error) {
    res.status(500).json({ error: "Error on fetching users" });
  }
};
