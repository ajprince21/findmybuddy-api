const User = require("../models/users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

// Register a new user
exports.register = async (req, res) => {
  const {
    username,
    first_name,
    last_name,
    password,
    email,
    profile_picture,
    bio,
    settings,
  } = req.body;

  // Validate input
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      first_name,
      last_name,
      password_hash: hashedPassword,
      email,
      profile_picture: profile_picture || "",
      bio: bio || "",
      settings: settings || {},
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "User registration failed", error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
