const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ MUST be before using app

// 📌 Import routes
const authRoutes = require("./routes/auth");

// 📌 Middleware
app.use(cors());
app.use(express.json());

// 📌 Routes
app.use("/api/auth", authRoutes);

// 📌 Test route
app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

// 📌 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// 📌 Port
const PORT = process.env.PORT || 5000;

// 📌 Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});