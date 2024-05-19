import axios from "axios";
import { error } from "console";
import { promiseHooks } from "v8";

const http = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
});
http.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default http;
