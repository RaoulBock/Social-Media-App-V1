const express = require("express");
const router = express.Router();

const city = require("../models/cities.model");

// Route to get all cities
router.get("/cities", (req, res) => {
  city
    .find()
    .then((cities) => {
      res.json(cities);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

module.exports = router;
