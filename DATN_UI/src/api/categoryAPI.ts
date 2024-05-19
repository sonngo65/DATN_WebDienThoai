import http from "../http";
import checkStatus from "./checkStatus";

export const post = (data: Category) => {
  return http
    .post("/categories", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const update = (data: Category) => {
  return http
    .put("/categories", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getById = (id: string) => {
  return http
    .get(`/categories/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getAll = () => {
  return http
    .get("/categories")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};

export const getAllChild = (id: string) => {
  return http
    .get(`/categories/child?parentId=${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};

export const getAllGroupChild = () => {
  return http
    .get("/categories/group-child")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getAllShow = () => {
  return http
    .get("/categories/show")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};

export const getPageInfo = (id: string) => {
  return http
    .get(`/categories/search/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const deleteById = (id: string) => {
  return http
    .delete(`/categories/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
