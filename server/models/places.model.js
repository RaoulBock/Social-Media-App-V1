const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placesSchema = new Schema({
  streetName: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    trim: true,
    default:
      "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png",
  },
  contactNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    default: "none",
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  payment_type: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// const RealEstate = mongoose.model("places", placesSchema);

// module.exports = RealEstate;

module.exports = mongoose.model("place", placesSchema);
