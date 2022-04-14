import { Typography } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
export default function Sidebar() {
  return (
    <div className="sidebarContainer">
      <Typography
        variant="h4"
        style={{ color: "#eee", marginBottom: "1rem", padding: "1rem" }}
      >
        Dashboard
      </Typography>
      <ul className="sidebarList">
        <li>
          <Typography variant="h5">
            <NavLink exact to="/" className="navlink">
              Home
            </NavLink>
          </Typography>
        </li>
        <li>
          <Typography variant="h5">
            <NavLink to="/users" className="navlink">
              Users
            </NavLink>
          </Typography>
        </li>
        <li>
          <Typography variant="h5">
            <NavLink to="/orders" className="navlink">
              Orders
            </NavLink>
          </Typography>
        </li>
        <li>
          <Typography variant="h5">
            <NavLink to="/books" className="navlink">
              Books
            </NavLink>
          </Typography>
        </li>
      </ul>
    </div>
  );
}
