import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
export default function FormSelect({ list, control, label, name }) {
  const generateSelectOptions = () => {
    return list.map((option) => {
      return (
        <MenuItem key={option.name} value={option.name}>
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
        <FormControl variant="outlined">
          <InputLabel id="select-outlined">{label}</InputLabel>
          <Select onChange={onChange} value={value}>
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
}
