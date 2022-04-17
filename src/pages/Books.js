import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BooksTable from "../components/BooksTable";
import axios from "axios";
import BookAdd from "../components/BookAdd";
export default function Users() {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookCategory, setBookCategory] = useState([]);

  const fetchCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:3006/api/books/getAllBookCategory"
    );
    setBookCategory(data);
  };
  const fetchBooks = async () => {
    const { data } = await axios.get(
      "http://localhost:3006/api/books/getAllBooks"
    );
    setBooks(data);
  };
  //For Add Button
  const handleSave = () => {
    setOpen(false);
    fetchBooks();
  };
  //For Add Button
  const handleClose = () => setOpen(false);
  //For Add Button
  const handleOpen = () => setOpen(true);
  useEffect(() => {
    fetchCategory();
    fetchBooks();
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
            handleSave={handleSave}
          />
        )}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <BooksTable
          bookCategory={bookCategory}
          books={books}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}
