const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

app.use("/api/auth", authRoutes);

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

// Allow frontend (Vercel) to connect
app.use(cors({
  origin: "*",   // later you can restrict to your Vercel URL
}));

app.use(express.json());

/* -------------------- DATABASE -------------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

/* -------------------- ROUTES -------------------- */

// Test route (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
// Auth routes
app.use("/auth", authRoutes);

/* -------------------- SERVER -------------------- */

// Render requires dynamic port
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});