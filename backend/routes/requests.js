const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Request = require("../models/Request");
const Listing = require("../models/Listing");
const router = express.Router();

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get user's requests
router.get("/", auth, async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user.id }).populate(
      "listingId",
    );
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create request
router.post("/", auth, async (req, res) => {
  try {
    const { listingId, message } = req.body;

    if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ message: "A valid listingId is required" });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const request = new Request({ userId: req.user.id, listingId, message });
    await request.save();
    res.status(201).json({ request });
  } catch (err) {
    console.error("Request creation failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update request status (admin only)
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access required" });
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({ request });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
