const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 4000;

app.get("/config/:service", (req, res) => {
  const rawService = req.params.service;
  const service = rawService;

  const configPath = path.join(__dirname, "configs", `${service}.json`);

  if (fs.existsSync(configPath)) {
    const data = fs.readFileSync(configPath);
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: `Config not found for ${service}` });
  }
});

app.listen(PORT, () => {
  console.log(`🛠️ Config-Service corriendo en http://localhost:${PORT}`);
});
