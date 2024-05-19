import http from "../http";
import checkStatus from "./checkStatus";

export const order = (data: OrderRequest) => {
  return http
    .post("/orders", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getAll = (
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = ""
) => {
  return http
    .get(`/orders?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};

export const getAllByAccountId = (data: string) => {
  return http
    .get(`/orders/${data}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};

export const updateStatus = (data: { orderId: string; status: number }) => {
  return http
    .put(`/orders/${data.orderId}/status/${data.status}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getOrdersSearch = (
  timeStart: any,
  timeEnd: any,
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = ""
) => {
  return http
    .get(
      `/orders/search?timeStart=${timeStart}&timeEnd=${timeEnd}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    )
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
