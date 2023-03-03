const mongoose = require('mongoose');
const CourseSchema = require("./course.model");

const EnrollmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.ObjectId, ref: 'courses' },
  updated: Date,
  enrolled: {
    type: Date,
    default: Date.now
  },
  student: { type: mongoose.Schema.ObjectId, ref: 'users' },
  lessonStatus: [{
    lesson: { type: mongoose.Schema.ObjectId, ref: 'lessons' },
    complete: Boolean
  }],
  completed: Date
})

const CartSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.ObjectId, ref: 'users' },
  courses: [String],
  last_updated: {
    type: Date,
    default: Date.now
  }
})

module.exports = {
  EnrollmentSchema: mongoose.model('Enrollment', EnrollmentSchema),
  CartSchema: mongoose.model('cart', CartSchema),
}
