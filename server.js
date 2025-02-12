const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
});
