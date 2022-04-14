import { Button } from "@material-ui/core";
import React from "react";
import CustomizedTable from "../components/Table";

export default function Users() {
  const columns = ["S.No", "Name", "Email", "Address"];
  const rows = [
    { Name: "Nirmal", Email: "Why@gmail.com", Address: "IIT Kharagpur" },
  ];
  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Button variant="contained" color="primary">
          Add User
        </Button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <CustomizedTable columns={columns} rowData={rows} />
      </div>
    </div>
  );
}
