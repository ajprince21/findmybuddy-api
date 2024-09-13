const Feed = require("../models/feeds");
const mongoose = require("mongoose");

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

// Get Single Feed Data
exports.getFeed = async (req, res) => {
  try {
    const feedId = req.params.id;
    const feed = await Feed.findById(feedId);
    if (!feed) {
      return res.status(404).json({ error: "Feed not found" });
    }
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFeed = async (req, res) => {
  try {
    const feedId = req.params.id;
    const feed = await Feed.findByIdAndDelete(feedId);
    if (!feed) {
      return res.status(404).json({ error: "Feed item not found" });
    }
    res.status(200).json({ message: "Feed successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Updating feed
exports.updateFeed = async (req, res) => {
  try {
    const feedId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(feedId)) {
      return res.status(400).json({ error: "Invalid feed ID format" });
    }
    const feed = await Feed.findById(feedId);

    if (!feed) {
      return res.status(404).json({ error: "Feed not found" });
    }
    if (!feed.user_id.equals(req.user.id)) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const updateData = req.body;
    const options = { new: true, runValidators: true };
    const updatedFeed = await Feed.findByIdAndUpdate(
      feedId,
      updateData,
      options
    );

    res.status(200).json(updatedFeed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFeed = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const { content } = req.body;
    const newFeed = new Feed({
      user_id: userId,
      content: content,
    });
    await newFeed.save();
    res.status(200).json(newFeed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
