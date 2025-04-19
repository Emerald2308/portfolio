const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    author: { type: String, default: 'Anonymous' },
    tags: [{ type: String }], // ✅ Array of tags
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
