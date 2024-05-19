import http from "../http";
import checkStatus from "./checkStatus";

export const signUp = (data: Account) =>
  http
    .post("/accounts/sign-up", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const signIn = (data: Account) =>
  http
    .post("/accounts/sign-in", data)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
export const getAll = (
  pageNo: string = "",
  pageSize: string = "",
  sortBy: string = ""
) =>
  http
    .get(`/accounts?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`)
    .then((response) => checkStatus(response))
    .then((response) => response.data);
