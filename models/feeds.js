const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  media: [
    {
      url: { type: String, required: true },
      type: { type: String, enum: ["image", "video"] },
    },
  ],
  visibility: {
    type: String,
    enum: ["public", "friends_only", "private"],
    default: "public",
  },
  likes: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      created_at: { type: Date, default: Date.now },
    },
  ],
  comments_count: { type: Number, default: 0 },
  shares_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Feed = mongoose.model("Feed", feedSchema);
module.exports = Feed;
