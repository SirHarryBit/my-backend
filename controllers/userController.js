const UserCourse = require('../models/UserCourse');
const Course = require('../models/Course');

exports.completeLecture = async (req, res) => {
  try {
    const { courseId, lectureIndex } = req.body;
    const userCourse = await UserCourse.findOne({ user: req.user.userId, course: courseId });
    
    if (!userCourse) {
      return res.status(404).json({ error: 'Course not found for this user' });
    }
    
    if (!userCourse.completedLectures.includes(lectureIndex)) {
      userCourse.completedLectures.push(lectureIndex);
      await userCourse.save();
    }
    
    const course = await Course.findById(courseId);
    const completionPercentage = (userCourse.completedLectures.length / course.lectures.length) * 100;
    
    res.json({ message: 'Lecture marked as complete', completionPercentage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserAnalytics = async (req, res) => {
  try {
    const userCourses = await UserCourse.find({ user: req.user.userId }).populate('course');
    const totalCourses = userCourses.length;
    const completedCourses = userCourses.filter(uc => 
      uc.completedLectures.length === uc.course.lectures.length
    ).length;
    
    const totalHoursLearned = userCourses.reduce((total, uc) => {
      // Assuming each lecture is 1 hour long for simplicity
      return total + uc.completedLectures.length;
    }, 0);
    
    res.json({
      totalCourses,
      completedCourses,
      totalHoursLearned
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};