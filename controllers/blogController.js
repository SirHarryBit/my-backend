// blogController.js
const Blog = require('../models/Blog');
const path = require('path');

// Multer configuration
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
      const url = 'http://localhost:5000/' + req.file.path.replace(/\\/g, '/') + '.webp';
      res.status(200).json({ url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.addBlog = [
  upload.single('featuredImage'), // Use upload.single for single file upload
  async (req, res) => {
    try {
      const blogData = { ...req.body };
      if (req.file) {
        blogData.featuredImage = req.file.path.replace(/\\/g, '/'); // Save the file path in the blog data
      }
      const blog = new Blog(blogData);
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}, 'id title description date featuredImage category');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id, 'title description date featuredImage category content');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
