import http from "../http";
import checkStatus from "./checkStatus";

export const add = (data: any) =>
  http
    .post("/banners", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const getAll = () =>
  http
    .get("/banners")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getById = (id: string) =>
  http
    .get(`/banners/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const updateById = (id: string, data: any) =>
  http
    .put(`/banners/${id}`, data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const deleteById = (id: string) =>
  http
    .delete(`/banners/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getHomeBanner = () => {
  return http
    .get("/banners/home")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
