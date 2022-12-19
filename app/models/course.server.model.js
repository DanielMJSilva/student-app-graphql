const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    unique: true,
    required: "Course code is required",
    trim: true,
  },
  courseName: {
    type: String,
    unique: true,
    required: "Course name is required",
  },
  section: String,
  semester: String,
});

module.exports = mongoose.model("Course", CourseSchema);
