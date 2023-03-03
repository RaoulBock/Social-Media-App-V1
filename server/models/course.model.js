const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("courses", CourseSchema);
