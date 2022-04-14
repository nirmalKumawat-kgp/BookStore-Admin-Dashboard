import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";

export default function BookEdit({ book, handleClose, open, bookCategory }) {
  const defaultValues = {
    name: book.name,
    author: book.author,
    discountPrice: book.discountPrice,
    originalPrice: book.originalPrice,
    category: book.category ? book.category : "",
    quantity: book.quantity,
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data, isDirty, dirtyFields, errors);
    if (isDirty) {
    }
  };
  const handleCancel = () => {
    reset();
    handleClose();
  };
  const onErrors = () => console.log(errors);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Book Details</DialogTitle>
      <DialogContent>
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
