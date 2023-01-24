import axios from "axios";

export default function customAxios() {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
}
