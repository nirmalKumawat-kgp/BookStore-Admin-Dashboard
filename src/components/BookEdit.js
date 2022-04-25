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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";
import API from "../baseUrl";
import { useNavigate } from "react-router-dom";
export default function BookEdit({
  book,
  handleClose,
  open,
  bookCategory,
  handleSave,
}) {
  const navigate = useNavigate();
  const [IsDirty, setIsDirty] = useState(true);
  const [IsFile, setIsFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  //form default values
  const defaultValues = {
    name: book.name,
    author: book.author,
    discountPrice: book.discountPrice,
    originalPrice: book.originalPrice,
    BookCategoryId: book.BookCategoryId ? book.BookCategoryId : "",
    quantity: book.quantity,
  };

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onBlur",
  });
  console.log(dirtyFields);
  const onSubmit = (data) => {
    if (!isDirty) {
      setIsDirty(false);
    }

    if (isDirty) {
      setLoading(true);

      const url = "books/update/" + book.id;
      const formData = new FormData();

      for (let eachField in dirtyFields) {
        if (eachField !== "file") {
          formData.append(eachField, data[eachField]);
        } else {
          formData.append("isImageChanged", true);
          formData.append("bookImage", data.file[0]);
        }
      }
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let result;
      API.put(url, formData, config)
        .then((response) => {
          result = response.data;
          if (!result.success) {
            console.log(result.error);
          }
          setLoading(false);
          navigate(0);
          handleSave();
        })
        .catch((error) => console.log(error));
    }
  };
  const handleCancel = () => {
    reset();
    handleClose();
  };
  const onErrors = () => console.log(errors);
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
      <DialogTitle id="form-dialog-title">Edit Book Details</DialogTitle>
      <DialogContent>
        {loading && (
          <Backdrop open={loading} style={{ zIndex: "99" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {!IsDirty && (
          <Alert severity="error" style={{ marginBottom: "1rem" }}>
            Plese Make Any Changes!
          </Alert>
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
              name="BookCategoryId"
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
