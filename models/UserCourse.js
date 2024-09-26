const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLectures: [{ type: Number }],
});

module.exports = mongoose.model('UserCourse', userCourseSchema);