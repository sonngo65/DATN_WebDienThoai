import http from "../http";
import checkStatus from "./checkStatus";

export const upload = (data: FormData) => {
  return http
    .post("/files", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
