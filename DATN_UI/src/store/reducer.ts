import { act } from "react-dom/test-utils";
import * as type from "./actionTypes";
import { paymentProduct } from "./actionCreators";
import { url } from "inspector";
const initialState = {
  isLoading: false,
  error: null,
  productPayment: [],
  data: {},
  breadcumb: [],
  isNotLogin: false,
};
const reducer = (state: any = initialState, action: type.ActionType) => {
  switch (action.type) {
    case type.ADD_PRODUCT_PENDING:
      return { ...state, isLoading: true };
    case type.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, ...action.payload },
      };
    case type.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: (action.payload as any).message,
      };
    case type.LOGIN:
      return {
        ...state,
        data: action.payload,
      };
    case type.PAYMENT_PRODUCT:
      return {
        ...state,
        paymentProduct: action.payload,
      };
    case type.NOT_LOGIN:
      console.log(state.isNotLogin);
      return {
        ...state,
        isNotLogin: !state.isNotLogin,
      };
    case type.SET_BREADCUMB:
      return {
        ...state,
        breadcumb: [{ name: "Trang chủ", url: "/" }, ...action.payload],
      };
    case type.CLEAR_BREADCUMB:
      return {
        ...state,
        breadcumb: [],
      };
    default:
      return state;
  }
};
export default reducer;
