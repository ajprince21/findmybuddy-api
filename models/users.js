const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  first_name: { type: String },
  last_name: { type: String },
  password_hash: { type: String, required: true },
  profile_picture: { type: String },
  bio: { type: String },
  settings: {
    notifications: {
      likes: { type: Boolean, default: true },
      comments: { type: Boolean, default: true },
      follows: { type: Boolean, default: true },
    },
    privacy: {
      profile: {
        type: String,
        enum: ["public", "friends_only"],
        default: "public",
      },
      posts: {
        type: String,
        enum: ["public", "friends_only", "private"],
        default: "public",
      },
    },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
  last_login: { type: Date },
  connection_status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  friends_count: { type: Number, default: 0 },
  posts_count: { type: Number, default: 0 },
  messages_count: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
