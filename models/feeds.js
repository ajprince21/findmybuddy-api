const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], required: true },
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
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Feed = mongoose.model("Feed", feedSchema);
module.exports = Feed;
