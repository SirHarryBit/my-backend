const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoLink: { type: String, required: true },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  featuredImage: { type: String, required: true },
  pages: [pageSchema],
});

module.exports = mongoose.model('Course', courseSchema);
