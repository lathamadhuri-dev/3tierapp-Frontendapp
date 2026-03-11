// ============================================================
// FRONTEND SERVER — Serves static chat UI
// Azure App Service (Node.js 18 LTS)
// ============================================================
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Inject backend URL into env for the client
app.use(express.static(path.join(__dirname, "public")));

// Serve config for the frontend to pick up backend URL
app.get("/config.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  const backendUrl = process.env.BACKEND_API_URL?.replace("/api", "") || "http://localhost:3001";
  res.send(`window.BACKEND_URL = "${backendUrl}";`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`[Frontend] Running on port ${PORT}`);
});
