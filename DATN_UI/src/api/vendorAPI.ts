import http from "../http";
import checkStatus from "./checkStatus";

export const getAllByCategory = (id: string) => {
  return http
    .get(`/vendors?categoryId=${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getById = (id: string) => {
  return http
    .get(`/vendors/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
