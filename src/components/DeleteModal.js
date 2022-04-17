import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import React from "react";

export default function DeleteModal({
  handleDeleteClose: handleClose,
  open,
  book,
}) {
  const handleDelete = () => {
    const url = "http://localhost:3006/api/books/delete/" + book.id;
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          handleClose();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Delete Book</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you really want to delete the book from database ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleDelete} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
