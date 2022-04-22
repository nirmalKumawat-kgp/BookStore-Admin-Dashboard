import { Button, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BooksTable from "../components/BooksTable";
import axios from "axios";
import BookAdd from "../components/BookAdd";
import API from "../baseUrl";
export default function Books() {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookCategory, setBookCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCategory = async () => {
    const { data } = await API.get("books/getAllBookCategory");
    setBookCategory(data);
  };
  const fetchBooks = async () => {
    const { data } = await API.get("books/getAllBooks");
    setBooks(data);
    setLoading(false);
  };
  //For Add Button
  const handleSave = () => {
    setLoading(true);
    setOpen(false);
    fetchBooks();
    setLoading(false);
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
        {loading ? (
          <LinearProgress />
        ) : (
          <BooksTable bookCategory={bookCategory} books={books} />
        )}
      </div>
    </div>
  );
}
