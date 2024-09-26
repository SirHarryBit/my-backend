// courseController.js
const Course = require('../models/Course');
const UserCourse = require('../models/UserCourse');
const path = require('path');

const upload = require('multer')({
  dest: 'uploads/',
  limits: { fileSize: 1000000 },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

exports.uploadImage = [
  upload.single('image'), // Use upload.single for single file upload
  (req, res) => {
    try {
      const url = 'http://localhost:5000/' + req.file.path.replace('\\', '/') + '.webp';
      res.status(200).json({ url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.addCourse = [
  upload.single('featuredImage'), // Use upload.single for single file upload
  async (req, res) => {
    try {
      console.log('Received course data:', req.body);
      console.log('Received file:', req.file);

      const courseData = { ...req.body };
      if (req.file) {
        courseData.featuredImage = req.file.path; // Save the file path in the course data 
      }
      const course = new Course(courseData);
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      console.error('Error adding course:', error);
      res.status(500).json({ error: error.message });
    }
  }];

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, 'title category description featuredImage');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserCourses = async (req, res) => {
  try {
    const userCourses = await UserCourse.find({ user: req.params.userId }).populate('course', 'title description featuredImage');
    res.json(userCourses.map(uc => uc.course));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

