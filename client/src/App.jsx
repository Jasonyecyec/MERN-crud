import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Button, TextField } from "@mui/material";
import { Blog } from "./components/Blog";
import DeleteConfirmation from "./components/DeleteConfirmation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [count, setCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(0);

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setCurrentBlog(id);
  };
  const handleDeleteModalClose = () => setDeleteModal(false);
  const handleEdit = () => setEdit(true);
  const handleEditClose = () => setEdit(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState({ name: "", title: "", content: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchBlog = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBlogs(data);
      console.log("blogs", blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        // Handle HTTP error responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchBlog();
      setForm({ name: "", title: "", content: "" });
      handleClose();
    } catch (err) {
      // Handle errors that occurred during form submission
      console.error("Error during form submission:", err);
      // You can also provide feedback to the user, e.g., display an error message
      alert("An error occurred during form submission. Please try again.");
    }
  };

  const editFunction = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/blogs/${form._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        // Handle HTTP error responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchBlog();
      setForm({ name: "", title: "", content: "" });
      handleClose();
    } catch (err) {
      // Handle errors that occurred during form submission
      console.error("Error during form submission:", err);
      // You can also provide feedback to the user, e.g., display an error message
      alert("An error occurred during form submission. Please try again.");
    }
  };

  return (
    <>
      <Button variant="contained" size="medium" onClick={handleOpen}>
        ADD BLOG
      </Button>

      {blogs.map((blog) => {
        return (
          <Blog
            blog={blog}
            edit={handleOpen}
            setForm={setForm}
            isEdit={handleEdit}
            isDelete={handleDeleteModal}
          />
        );
      })}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          handleClose();
          handleEditClose();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              margin="dense"
              name="name"
              onChange={handleChange}
              value={form.name}
            />
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              margin="dense"
              name="title"
              onChange={handleChange}
              value={form.title}
            />

            <TextField
              id="outlined-basic"
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              margin="dense"
              name="content"
              onChange={handleChange}
              value={form.content}
            />

            <Button
              variant="contained"
              size="medium"
              onClick={edit ? editFunction : handleSubmit}
            >
              {edit ? "Edit" : "Submit"}
            </Button>
          </Box>
        </Fade>
      </Modal>

      <DeleteConfirmation
        open={deleteModal}
        handleclose={handleDeleteModalClose}
        id={currentBlog ? currentBlog : 0}
        fetchBlog={fetchBlog}
      />
    </>
  );
}

export default App;
