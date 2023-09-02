const BlogModel = require("../models/Blog");

// GET /api/goals
const getBlogs = async (req, res) => {
  try {
    const blog = await BlogModel.find();
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

const getBlogsById = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

// POST /api/goals
const setBlogs = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400);
      throw new Error("Pleas add a name  field");
    }

    const blog = await BlogModel.create({
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
    });

    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

// PUT /api/goals
const updateBlogs = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      res.status(400);
      throw new Error("Blog not found");
    }

    const updatedBlogs = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Get the updated document
    );

    res.json(updatedBlogs);
  } catch (err) {
    console.log(err);
  }
};

// DELETE /api/goals
const deleteBlogs = async (req, res) => {
  try {
    // const blog = await BlogModel.findById(req.params.id);
    const blog = await BlogModel.findByIdAndRemove(req.params.id);

    if (!blog) {
      res.status(400);
      throw new Error("Blog not found");
    }

    res.json({ id: req.params.id });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getBlogs,
  getBlogsById,
  setBlogs,
  updateBlogs,
  deleteBlogs,
};
