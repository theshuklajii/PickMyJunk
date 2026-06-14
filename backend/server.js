const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Listing = require("./models/Listing");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
const seedListings = async () => {
  const listingCount = await Listing.countDocuments();
  if (listingCount > 0) return;

  const seedUserEmail = "seed@pickmyjunk.local";
  let seedUser = await User.findOne({ email: seedUserEmail });

  if (!seedUser) {
    const hashedPassword = await bcrypt.hash("SeedUser123!", 10);
    seedUser = await User.create({
      email: seedUserEmail,
      password: hashedPassword,
      role: "user",
    });
  }

  const sampleListings = [
    {
      name: "Old MacBook Pro",
      category: "Computers",
      ageInYears: 6,
      defectPercentage: 35,
      estimatedPrice: 18000,
      location: "Lucknow, UP",
      status: "available",
    },
    {
      name: "Broken LED Monitor",
      category: "Displays",
      ageInYears: 4,
      defectPercentage: 55,
      estimatedPrice: 4200,
      location: "Varanasi, UP",
      status: "pending",
    },
    {
      name: "Damaged iPhone 11",
      category: "Phones",
      ageInYears: 3,
      defectPercentage: 48,
      estimatedPrice: 9500,
      location: "Kanpur, UP",
      status: "available",
    },
    {
      name: "Faulty AirPods Case",
      category: "Accessories",
      ageInYears: 2,
      defectPercentage: 25,
      estimatedPrice: 2200,
      location: "Prayagraj, UP",
      status: "available",
    },
    {
      name: "Old WiFi Router",
      category: "Networking",
      ageInYears: 5,
      defectPercentage: 60,
      estimatedPrice: 750,
      location: "Agra, UP",
      status: "pending",
    },
  ].map((listing) => ({ ...listing, userId: seedUser._id }));

  await Listing.insertMany(sampleListings);
  console.log(`🌱 Seeded ${sampleListings.length} sample listings`);
};

const seedAdminUser = async () => {
  const adminEmail = "admin@pickmyjunk.in";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash("shuklajii", 10);
  await User.create({
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log("🔐 Seeded admin account: admin@pickmyjunk.in / shuklajii");
};

const connectAndStart = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    await seedListings();
    await seedAdminUser();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

// Import routes
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listings");
const requestRoutes = require("./routes/requests");
const adminRoutes = require("./routes/admin");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/api/test", (req, res) =>
  res.json({ message: "Backend is running!" }),
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
connectAndStart();
