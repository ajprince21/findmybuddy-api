const express = require("express");
const {
  getFeeds,
  getFeed,
  deleteFeed,
  updateFeed,
  createFeed,
  getFeedCount,
} = require("../controllers/feedController");
const router = express.Router();

router.get("/", getFeeds);
router.get("/count", getFeedCount);
router.get("/:id", getFeed);
router.delete("/:id", deleteFeed);
router.put("/:id", updateFeed);
router.post("/create", createFeed);

module.exports = router;
