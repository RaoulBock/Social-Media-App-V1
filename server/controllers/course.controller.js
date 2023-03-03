const Course = require('../models/course.model');
const errorHandler = require('../helpers/dbErrorHandler');
const { utils } = require('../helpers/util');
const defaultImage = "require('./../client/assets/images/default.png')";

const create = (req, res) => {
  const record = new Course(utils.generate_file({ key: "image", query: req.body }));

  record
    .save()
    .then((e) => res.send(JSON.stringify({ message: "success", results: e })), (err) => res.send(JSON.stringify({ error: err })));
}

/**
 * Load course and append to req.
 */
const courseByID = async (req, res, next, id) => {
  try {
    let course = await Course.findById(id).populate('instructor', '_id name')
    if (!course)
      return res.status('400').json({
        error: "Course not found"
      })
    req.course = course
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve course"
    })
  }
}

const read = (req, res) => {
  req.course.image = undefined
  return res.json(req.course)
}

const list = async (req, res) => {
  try {
    let courses = await Course.find().select('name email updated created')
    res.json(courses)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res, id) => {
  let query = utils.generate_file({ key: "image", query: req.body });

  const keys = {};

  Object.keys(query).forEach(key => { if (key !== "_id") keys[key] = query[key]; });

  Course.updateOne({ _id: query._id }, keys, function (err, result) {
    res.send(
      JSON.stringify((err === null) ? { msg: '' } : { msg: err })
    );
  });
}

const newLesson = async (req, res) => {
  try {
    let lesson = req.body.lesson
    let result = await Course.findByIdAndUpdate(req.course._id, { $push: { lessons: lesson }, updated: Date.now() }, { new: true })
      .populate('instructor', '_id name')
      .exec()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let course = req.course
    let deleteCourse = await course.remove()
    res.json(deleteCourse)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isInstructor = (req, res, next) => {
  const isInstructor = req.course && req.auth && req.course.instructor._id == req.auth._id
  if (!isInstructor) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

const listByInstructor = (req, res) => {
  Course.find({ instructor: req.profile._id }, (err, courses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(courses)
  }).populate('instructor', '_id name')
}

const listPublished = (req, res) => {
  Course.find({ published: true }, (err, courses) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(courses)
  }).populate('instructor', '_id name')
}

const photo = (req, res, next) => {
  if (req.course.image.data) {
    res.set("Content-Type", req.course.image.contentType)
    return res.send(req.course.image.data)
  }
  next()
}
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + defaultImage)
}


module.exports = {
  create,
  courseByID,
  read,
  list,
  remove,
  update,
  isInstructor,
  listByInstructor,
  photo,
  defaultPhoto,
  newLesson,
  listPublished
}
