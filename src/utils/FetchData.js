import axios from "axios";

export const getBookCategory = async () => {
  let bookCategory = null;
  const fetchCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:3006/api/books/getAllBookCategory"
    );
    bookCategory = await data;
  };
  await fetchCategory();
  return bookCategory;
};
