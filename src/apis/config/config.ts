import axios from "axios";

export const request = axios.create({
  withCredentials: true,
  timeout: 10000,
});
