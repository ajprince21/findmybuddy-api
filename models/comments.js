const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  feed_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feed",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  likes: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      created_at: { type: Date, default: Date.now },
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
