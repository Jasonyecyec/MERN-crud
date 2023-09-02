import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export const Blog = ({ blog, edit, setForm, isEdit, isDelete }) => {
  const fetchBlogById = async (id) => {
    try {
      const response = await fetch(
        `https://mern-crud-api-seven.vercel.app/api/blogs/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      edit();
      isEdit();

      setForm({
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Box
        key={blog.id}
        sx={{
          bgcolor: "background.paper",
          boxShadow: 2,
          borderRadius: 1,
          p: 1,
          my: 2,
          minWidth: 300,
        }}
      >
        <p>{blog.name}</p>
        <p>{new Date(blog.date).toLocaleString()}</p>
        <p>{blog.title}</p>
        <p>{blog.content}</p>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => isDelete(blog._id)}>
            Delete
          </Button>

          <Button variant="outlined" onClick={() => fetchBlogById(blog._id)}>
            Edit
          </Button>
        </Stack>
      </Box>
    </div>
  );
};
