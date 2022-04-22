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
import API from "../baseUrl";
import { useNavigate } from "react-router-dom";

export default function DeleteModal({
  handleDeleteClose: handleClose,
  open,
  book,
}) {
  const navigate = useNavigate();
  const handleDelete = () => {
    const url = "books/delete/" + book.id;
    API.delete(url)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          handleClose();
          navigate(0);
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
