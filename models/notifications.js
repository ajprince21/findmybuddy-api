const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "follow_request", "comment", "message"],
    required: true,
  },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  is_read: { type: Boolean, default: false },
  related_id: { type: mongoose.Schema.Types.ObjectId, refPath: "relatedModel" }, // Optional relation to any relevant document
  link: { type: String },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
