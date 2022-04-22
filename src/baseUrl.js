import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://sreevidhya.herokuapp.com/api/"
      : "http://localhost:3006/api/",
});
export default API;
