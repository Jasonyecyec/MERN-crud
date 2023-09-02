import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteConfirmation = ({ open, handleclose, id, fetchBlog }) => {
  const handleDeletBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle HTTP error responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchBlog();
      //   setForm({ name: "", title: "", content: "" });
      handleclose();
    } catch (err) {
      // Handle errors that occurred during form submission
      console.error("Error during form submission:", err);
      // You can also provide feedback to the user, e.g., display an error message
      alert("An error occurred during form submission. Please try again.");
    }
  };

  return (
    <div>
      {" "}
      <Dialog
        open={open}
        onClose={handleclose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleclose}>Cancel</Button>
          <Button onClick={() => handleDeletBlog(id)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmation;
