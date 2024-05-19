import http from "../http";
import checkStatus from "./checkStatus";

export const add = (data: any) =>
  http
    .post("/feedbacks", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const getAll = () =>
  http
    .get("/feedbacks")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getById = (id: string) =>
  http
    .get(`/feedbacks/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const updateById = (id: string, data: any) =>
  http
    .put(`/feedbacks/${id}`, data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const deleteById = (id: string) =>
  http
    .delete(`/feedbacks/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
