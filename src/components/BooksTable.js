import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import axios from "axios";
import React, { useEffect, useState } from "react";
import BookEdit from "./BookEdit";
import { getBookCategory } from "../utils/FetchData";

export default function BooksTable({ bookCategory }) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  // const [bookCategory, setBookCategory] = useState([]);
  const [edit, setEdit] = useState({ showEdit: false, rowIndex: null });
  const [deleteBook, setDeleteBook] = useState(false);
  const [open, setOpen] = useState(true);
  const columns = [
    "Name",
    "Author",
    "Original Price",
    "Discount Price",
    "Action",
  ];

  // const fetchCategory = async () => {
  //   const { data } = await axios.get(
  //     "http://localhost:3006/api/books/getAllBookCategory"
  //   );
  //   setBookCategory(data);
  // };
  const categories = getBookCategory();
  console.log(categories);
  const fetchBooks = async () => {
    const { data } = await axios.get(
      "http://localhost:3006/api/books/getAllBooks"
    );
    console.log(data);
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
    // fetchCategory();
  }, []);

  const handleSearch = () => {
    return books.filter((book) =>
      book.name.toLowerCase().includes(search.toLowerCase())
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (index) => {
    setEdit({ showEdit: true, rowIndex: index });
    setOpen(true);
  };
  const handleDelete = () => {};

  return (
    <Container style={{ textAlign: "center" }}>
      <TextField
        label="Search For a Book.."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((eachColumn) => {
                return (
                  <TableCell
                    align={eachColumn === "Name" ? "center" : "right"}
                    key={eachColumn}
                  >
                    {eachColumn}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {handleSearch()
              .slice((page - 1) * 51, (page - 1) * 51 + 50)
              .map((book, index) => (
                <TableRow>
                  <TableCell align="center">{book.name}</TableCell>
                  <TableCell align="right">{book.author}</TableCell>
                  <TableCell align="right">{book.originalPrice}</TableCell>
                  <TableCell align="right">{book.discountPrice}</TableCell>
                  <TableCell align="right">
                    <span
                      className="material-icons"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEdit(index)}
                    >
                      edit
                    </span>
                    <span
                      className="material-icons"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(book, index)}
                    >
                      delete
                    </span>
                    {edit.showEdit && edit.rowIndex === index && (
                      <BookEdit
                        handleClose={handleClose}
                        open={open}
                        bookCategory={bookCategory}
                        book={book}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        count={parseInt((handleSearch()?.length / 50).toFixed(0))}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
}
