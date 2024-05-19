import http from "../http";
import checkStatus from "./checkStatus";

export const add = (data: any) =>
  http
    .post("/news", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const getAll = (
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = ""
) =>
  http
    .get(`/news?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const getAllShow = (
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = ""
) =>
  http
    .get(`/news/show`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const getById = (id: string) =>
  http
    .get(`/news/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const updateById = (id: string, data: News) =>
  http
    .put(`/news/${id}`, data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const deleteById = (id: string) =>
  http
    .delete(`/news/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
