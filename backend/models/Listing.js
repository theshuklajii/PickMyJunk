const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  ageInYears: { type: Number, required: true },
  defectPercentage: { type: Number, default: 0 },
  estimatedPrice: { type: Number, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['available', 'sold', 'pending'], default: 'available' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Listing', listingSchema);