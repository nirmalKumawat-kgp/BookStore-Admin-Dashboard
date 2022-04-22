import { Button } from "@material-ui/core";
import React from "react";

import UserTable from "../components/User/UserTable";

export default function Users() {
  const columns = ["S.No", "Name", "Email", "Address"];
  const rows = [
    { Name: "Nirmal", Email: "Why@gmail.com", Address: "IIT Kharagpur" },
  ];
  return (
    <div>
      {/* <div style={{ textAlign: "right" }}>
        <Button variant="contained" color="primary">
          Add User
        </Button>
      </div> */}
      <div style={{ marginTop: "1rem" }}>
        <UserTable />
      </div>
    </div>
  );
}
