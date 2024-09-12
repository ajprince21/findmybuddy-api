const express = require("express");
const {
  getProfile,
  updateProfile,
  getAllUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/:id", getProfile);
router.get("/", getAllUsers);
router.put("/edit", authMiddleware, updateProfile);

module.exports = router;
 