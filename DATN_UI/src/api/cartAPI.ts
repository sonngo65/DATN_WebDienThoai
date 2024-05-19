import http from "../http";
import checkStatus from "./checkStatus";

export const add = (data: CartRequest) =>
  http
    .post("/carts", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getByAccount = (id: string) =>
  http
    .get(`/carts/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const updateQuantity = (id: string, quantity: number) =>
  http
    .put(`/carts/${id}?quantity=${quantity}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const deleteById = (id: string) =>
  http
    .delete(`/carts/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
