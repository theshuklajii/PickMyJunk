const express = require('express');
const jwt = require('jsonwebtoken');
const Listing = require('../models/Listing');
const router = express.Router();

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all listings (public for landing page)
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('userId', 'email');
    res.json({ listings });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's listings
router.get('/my', auth, async (req, res) => {
  try {
    const listings = await Listing.find({ userId: req.user.id });
    res.json({ listings });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create listing
router.post('/', auth, async (req, res) => {
  try {
    const listing = new Listing({ ...req.body, userId: req.user.id });
    await listing.save();
    res.status(201).json({ listing });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update listing
router.put('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json({ listing });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;