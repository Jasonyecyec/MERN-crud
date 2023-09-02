const express = require("express");
const router = express.Router();
const {
  getBlogs,
  setBlogs,
  updateBlogs,
  deleteBlogs,
  getBlogsById,
} = require("../controller/blogController");

router.get("/", getBlogs);

router.get("/:id", getBlogsById);

router.post("/", setBlogs);

router.put("/:id", updateBlogs);

router.delete("/:id", deleteBlogs);

module.exports = router;
