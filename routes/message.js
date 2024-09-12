const express = require("express");
const {
  sendMessage,
  getMessages,
  getChatList,
  getMessageCount,
} = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/send-message", authMiddleware, sendMessage);
router.get("/:buddyId", authMiddleware, getMessages);
router.get("/count/:buddyId", authMiddleware, getMessageCount);
router.get("/:userId/chat-list", authMiddleware, getChatList);

module.exports = router;
