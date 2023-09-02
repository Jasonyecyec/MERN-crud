const express = require("express");
const router = express.Router();
const {
  getBlogs,
  setBlogs,
  updateBlogs,
  deleteBlogs,
} = require("../controller/blogController");

router.get("/", getBlogs);

router.post("/", setBlogs);

router.put("/:id", updateBlogs);

router.delete("/:id", deleteBlogs);

module.exports = router;
