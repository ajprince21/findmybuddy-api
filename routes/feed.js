const express = require("express");
const {
  getFeeds,
  getFeed,
  deleteFeed,
  updateFeed,
  createFeed,
  getFeedCount,
} = require("../controllers/feedController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getFeeds);
router.get("/count", getFeedCount);
router.get("/:id", getFeed);
router.delete("/:id", authMiddleware, deleteFeed);
router.put("/:id", authMiddleware, updateFeed);
router.post("/create", authMiddleware, createFeed);

module.exports = router;
