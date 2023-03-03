const express = require("express");
const router = express.Router();

const place = require("../models/places.model");

// POST route to create a new real estate listing
router.post("/places", (req, res) => {
  const newListing = new place({
    streetName: req.body.streetName,
    amount: req.body.amount,
    description: req.body.description,
    images: req.body.images,
    contactNumber: req.body.contactNumber,
    location: req.body.location,
    type: req.body.type,
    payment_type: req.body.payment_type,
  });
  newListing.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating real estate listing");
    } else {
      res.status(201).send("Real estate listing created successfully");
    }
  });
});

// GET route to retrieve all real estate listings
router.get("/places", (req, res) => {
  place.find({}, (err, places) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving real estate listings");
    } else {
      res.status(200).json(places);
    }
  });
});

module.exports = router;
