const express = require('express');
const router = express.Router();
const Post = require('../models/post'); 
const { createPost } = require('../controllers/postsController');


// 🟢 Route: Create a post (only for authenticated/admin users)
const authMiddleware = require('../middleware/authMiddleware');
router.post('/', authMiddleware, createPost);


// 🟢 Route: Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// 🟢 Route: Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
