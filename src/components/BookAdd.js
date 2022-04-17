import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";

export default function BookAdd({
  handleClose,
  open,
  bookCategory,
  handleSave,
}) {
  const [loading, setLoading] = useState(false);

  const [IsFile, setIsFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const defaultValues = {
    name: "",
    author: "",
    discountPrice: "",
    originalPrice: "",
    category: "",
    quantity: 0,
  };

  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    setLoading(true);
    const url = "http://localhost:3006/api/books/addBook";
    const formData = new FormData();

    formData.append("bookImage", data.file[0]);
    formData.append("name", data.name);
    formData.append("author", data.author);
    formData.append("discountPrice", data.discountPrice);
    formData.append("originalPrice", data.originalPrice);
    formData.append("quantity", data.quantity);
    formData.append("BookCategoryId", 1);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    let result;
    axios
      .post(url, formData, config)
      .then((response) => {
        result = response.data;
        if (!result.success) {
          console.log(result.error);
        }
        setLoading(false);
        handleSave();
      })
      .catch((error) => console.log(error));
  };
  // function to close add book dialog
  const handleCancel = () => {
    reset();
    handleClose();
  };

  const onErrors = () => console.log(errors);

  // Function to handle File Upload
  const handleChange = (e) => {
    setIsFile(true);
    setFileName(e.target.files[0].name);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Book Details</DialogTitle>
      <DialogContent>
        {loading && (
          <Backdrop open={loading} style={{ zIndex: "99" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormInput name="name" label="Enter name here" control={control} />
            {errors?.name && (
              <Alert severity="error">{errors.name.message}</Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <FormInput
              type="text"
              name="author"
              label="Enter author here"
              control={control}
            />
            {errors?.author && (
              <Alert severity="error">{errors.author.message}</Alert>
            )}
          </Grid>
          <Grid item xs={6}>
            <FormInput
              type="text"
              name="discountPrice"
              label="Enter Discount Price here"
              control={control}
            />
            {errors?.discountPrice && (
              <Alert severity="error">{errors.discountPrice.message}</Alert>
            )}
          </Grid>
          <Grid item xs={6}>
            <FormInput
              type="text"
              name="originalPrice"
              label="Enter Original Price here"
              control={control}
            />
            {errors?.originalPrice && (
              <Alert severity="error">{errors.originalPrice.message}</Alert>
            )}
          </Grid>
          <Grid item xs={6}>
            <FormSelect
              list={bookCategory}
              control={control}
              label="Category"
              name="category"
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              name="quantity"
              type="number"
              label="Quantity"
              control={control}
            />
          </Grid>
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              {...register("file", {
                onChange: (e) => handleChange(e),
              })}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
            {IsFile && (
              <Typography variant="body2" style={{ marginLeft: "1rem" }}>
                {fileName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit, onErrors)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
