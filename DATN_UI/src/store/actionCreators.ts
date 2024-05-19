import { ProductAPI } from "../api";
import * as actionTypes from "./actionTypes";
export const AddProduct = (data: createProductRequest) => {
  return async function thunk(dispatch: any) {
    dispatch({ type: actionTypes.ADD_PRODUCT_PENDING });
    try {
      const response = await ProductAPI.post(data);
      dispatch({ type: actionTypes.ADD_PRODUCT_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: actionTypes.ADD_PRODUCT_FAILURE, payload: error });
    }
  };
};

export const paymentProduct = (data: any) => {
  return { type: actionTypes.PAYMENT_PRODUCT, payload: data };
};
