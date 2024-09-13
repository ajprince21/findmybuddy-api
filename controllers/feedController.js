const Feed = require("../models/feeds");

// Get feeds with pagination
exports.getFeeds = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const feeds = await Feed.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(feeds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total number of feeds
exports.getFeedCount = async (req, res) => {
  try {
    const count = await Feed.countDocuments();
    res.status(200).json({ total: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getFeed = async = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteFeed = async = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateFeed = async = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createFeed = async = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
