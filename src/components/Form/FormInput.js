import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { Controller } from "react-hook-form";
export default function FormInput({ name, control, label, type }) {
  return (
    <Controller
      rules={{ required: `${name} is required` }}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div>
          <TextField
            type={type}
            onChange={onChange}
            value={value}
            label={label}
            variant="outlined"
          />
        </div>
      )}
    />
  );
}
