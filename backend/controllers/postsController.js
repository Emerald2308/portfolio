const Post = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    console.log("📥 Incoming blog post data:", req.body);

    const { title, content, image, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const newPost = new Post({
      title,
      content,
      image,
      tags: Array.isArray(tags) ? tags : [], // ✅ Save tags as array
      author: "Admin", // Replace with req.user.name or ID if auth is enabled
    });

    const saved = await newPost.save();
    console.log("✅ Blog post saved:", saved);

    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error saving post:", error.message);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
