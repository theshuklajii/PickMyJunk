const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Request = require("../models/Request");
const Listing = require("../models/Listing");
const router = express.Router();

// Middleware to verify JWT and admin role
const authAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Admin access required" });
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get all users
router.get("/users", authAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all requests
router.get("/requests", authAdmin, async (req, res) => {
  try {
    const { status = "pending" } = req.query;
    const filter = status === "all" ? {} : { status };

    const requests = await Request.find(filter)
      .populate("userId", "email")
      .populate("listingId");
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single request details
router.get("/requests/:id", authAdmin, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("userId", "email role")
      .populate("listingId");

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json({ request });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete user
router.delete("/users/:id", authAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
