import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Users from "./pages/Users";
import Books from "./pages/Books";
import Orders from "./pages/Orders";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<App />}>
        <Route path="users" exact element={<Users />} />
        <Route path="books" exact element={<Books />} />
        <Route path="orders" exact element={<Orders />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
