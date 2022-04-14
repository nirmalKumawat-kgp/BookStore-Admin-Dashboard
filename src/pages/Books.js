import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BooksTable from "../components/BooksTable";
import CustomizedTable from "../components/Table";
import axios from "axios";
import BookAdd from "../components/BookAdd";
export default function Users() {
  const [open, setOpen] = useState(false);
  const [bookCategory, setBookCategory] = useState([]);
  const fetchCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:3006/api/books/getAllBookCategory"
    );
    setBookCategory(data);
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Book
        </Button>
        {open && (
          <BookAdd
            open={open}
            handleClose={handleClose}
            bookCategory={bookCategory}
          />
        )}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <BooksTable bookCategory={bookCategory} />
      </div>
    </div>
  );
}
