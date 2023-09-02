const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const BlogModel = require("./models/Blog");
const port = 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/blogs", require("./routes/blogRoutes"));

app.use(errorHandler);

connectDB();

app.listen(port, () => {
  console.log("server is runnsdsing ");
});
