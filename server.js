const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ quiet: true });

const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Routes
// ======================
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// ======================
// Health Check Route
// ======================
app.get("/", (req, res) => {
  res.send("WebOS AI Backend Running");
});

// ======================
// MongoDB Connection
// ======================

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // stop server if DB fails
  });

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});