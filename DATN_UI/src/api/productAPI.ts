import { useNavigate } from "react-router-dom";
import http from "../http";
import checkStatus from "./checkStatus";
export const post = (data: createProductRequest) => {
  return http
    .post<String>("/products", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};

export const get = (id: string) => {
  return http
    .get<GetProductResponse>(`/products/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const updateById = (id: string, data: createProductRequest) => {
  return http
    .put(`/products/${id}`, data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const deleteById = (id: string) => {
  return http
    .delete(`/products/${id}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};

export const getAll = (
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = ""
) =>
  http
    .get(`/products/all?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getProductsInCategories = () => {
  return http
    .get("/products/categories")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getProductsInCategoryByCategoryId = (
  id: string,
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = "",
  vendorId = "",
  priceStart = "",
  priceEnd = ""
) =>
  http
    .get(
      `/products/categories/${id}?vendorId=${vendorId}&priceStart=${priceStart}&priceEnd=${priceEnd}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    )
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getProductsInCategoryByCategoryIdAndVendorId = ({
  categoryId,
  vendorId,
}: {
  categoryId: string;
  vendorId: string;
}) =>
  http
    .get(`/products/categories/${categoryId}/vendors/${vendorId}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getProductsByName = (name: string) =>
  http
    .get(`/products?name=${name}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const getProductsByNameSearch = (
  name: string,
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = ""
) =>
  http
    .get(
      `/products/search?name=${name}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    )
    .then((response) => checkStatus(response))
    .then((response) => response.data);

export const addProductToFlashSale = (data: any) => {
  return http
    .post("/products/flash-sale", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const deleteProductFromFlashSale = () => {
  return http
    .delete("/products/flash-sale")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const getAllFlashSaleProducts = () => {
  return http
    .get("/products/flash-sale")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
};
export const statisticSales = (
  groupTime: string,
  duration: string,
  preTime: string
) =>
  http
    .get(
      `products/statistic/sales?group-time=${groupTime}&duration=${duration}&preTime=${preTime}`
    )
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const statisticAll = () =>
  http
    .get("products/statistic/all")
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getRelatedProductByCategoryId = (
  categoryId: string,
  productId: string
) =>
  http
    .get(
      `products/related-product?categoryId=${categoryId}&productId=${productId}`
    )
    .then((response) => checkStatus(response))
    .then((response) => response.data);
