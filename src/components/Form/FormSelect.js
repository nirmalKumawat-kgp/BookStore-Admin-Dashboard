import { TextField, MenuItem } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
export default function FormSelect({ list, control, label, name }) {
  console.log(list);
  const generateSelectOptions = () => {
    return list.map((option) => {
      return (
        <MenuItem key={option.name} value={option.id}>
          {option.name}
        </MenuItem>
      );
    });
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          value={value}
          onChange={onChange}
          select // tell TextField to render select
          label={label}
          variant={"outlined"}
          style={{ width: "100%" }}
        >
          {generateSelectOptions()}
        </TextField>
      )}
    />
  );
}
