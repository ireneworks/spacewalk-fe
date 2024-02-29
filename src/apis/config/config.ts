import axios from "axios";

export const request = axios.create({
  headers: { Authorization: process.env.REACT_APP_TOKEN },
  withCredentials: true,
  timeout: 10000,
});
