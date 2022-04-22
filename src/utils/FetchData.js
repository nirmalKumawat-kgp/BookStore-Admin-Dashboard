import API from "../baseUrl";
export const getBookCategory = async () => {
  let bookCategory = null;
  const fetchCategory = async () => {
    const { data } = await API.get("books/getAllBookCategory");
    bookCategory = await data;
  };
  await fetchCategory();
  return bookCategory;
};
