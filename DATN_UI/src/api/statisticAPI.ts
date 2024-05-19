import http from "../http";
import checkStatus from "./checkStatus";

export const getStatistic = () => {
  return http
    .get("/statistic")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getSaleProductStatistic = (timeStart: any, timeEnd: any) => {
  return http
    .get(`/statistic/sale-product?timeStart=${timeStart}&timeEnd=${timeEnd}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};

export const getOrdersStatistic = (
  timeStart: any,
  timeEnd: any,
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = ""
) => {
  return http
    .get(
      `/statistic/sale-product/orders?timeStart=${timeStart}&timeEnd=${timeEnd}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    )
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
