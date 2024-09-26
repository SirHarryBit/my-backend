const User = require('../models/User');
const UserCourse = require('../models/UserCourse');
const Course = require('../models/Course');
const Blog = require('../models/Blog');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignCourse = async (req, res) => {
  try {

    const { userId, courseId } = req.body;
    const userCourse = new UserCourse({ user: userId, course: courseId });
    await userCourse.save();
    res.status(201).json({ message: 'Course assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    // This is a placeholder for analytics logic
    // You'll need to implement actual analytics based on your requirements
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    res.json({
      totalUsers,
      totalCourses,
      totalBlogs,
      // Add more analytics data here
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};