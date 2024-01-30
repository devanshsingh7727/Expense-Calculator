import axios from "axios";

const connection = axios.create({
  baseURL: "/api",
});

export default connection;
