import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.0.101:8005/`,
  // baseURL: `http://localhost:8005/`,
});
