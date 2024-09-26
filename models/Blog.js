const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  text: { type: String, required: true },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  featuredImage: { type: String, required: true },
  content: [contentSchema],
});

module.exports = mongoose.model('Blog', blogSchema);
