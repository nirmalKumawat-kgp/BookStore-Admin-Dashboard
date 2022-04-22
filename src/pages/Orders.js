import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import API from "../baseUrl";
import OrderTable from "../components/Orders/OrderTable";
export default function Orders() {
  const [orders, setorders] = useState([]);

  //For Add Button
  // const handleSave = () => {
  //   setLoading(true);

  //   setLoading(false);
  // };

  useEffect(() => {}, []);

  return (
    <div>
      <div style={{ marginTop: "1rem" }}>
        <OrderTable />
      </div>
    </div>
  );
}
