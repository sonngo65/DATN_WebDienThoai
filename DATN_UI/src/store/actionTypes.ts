import { AxiosError } from "axios";
import { ErrorInfo } from "react";
import { ErrorResponse } from "react-router-dom";

export type ActionType = {
  type: string;
  payload: object | any;
};

export type DispatchType = (action: ActionType) => ActionType;

export const ADD_PRODUCT_PENDING = "ADD_PRODUCT_PENDING";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

export const LOGIN = "LOGIN";

export const PAYMENT_PRODUCT = "PAYMENT_PRODUCT";

export const NOT_LOGIN = "NOT_LOGIN";

export const SET_BREADCUMB = "SET_BREADCUMB";
export const CLEAR_BREADCUMB = "CLEAR_BREADCUMB";
