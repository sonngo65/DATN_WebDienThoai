import { Link, useNavigate } from "react-router-dom";
import GiftInfo from "../ProductDetail/GiftInfo";
import CartDetailList from "./CartDetailList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../../untils";
import { useDispatch } from "react-redux";
import * as actionType from "../../../store/actionTypes";
import { CartAPI } from "../../../api";
import { act } from "react-dom/test-utils";
import { stringify } from "querystring";
export default function CartDetail() {
  const rootState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [carts, SetCarts] = useState<CartResponse[]>([
    {
      id: "",
      optionDetailId: "",
      name: "",
      optionName: "",
      image: "",
      price: 0,
      quantity: 0,
      status: 1,
    },
  ]);

  const handleUpdate = (id: string, quantity: number) => {
    CartAPI.updateQuantity(id, quantity);
    let oldCarts = JSON.parse(sessionStorage.getItem("carts") as any);
    sessionStorage.setItem(
      "carts",
      JSON.stringify(
        oldCarts.map((oldCart: any) => {
          if (oldCart.id === id) return { ...oldCart, quantity: quantity };
          else return oldCart;
        })
      )
    );
    dispatch({ type: actionType.LOGIN });
  };
  const handleDelete = (id: string) => {
    CartAPI.deleteById(id);
    let oldCarts = JSON.parse(sessionStorage.getItem("carts") as any);
    sessionStorage.setItem(
      "carts",
      JSON.stringify(oldCarts.filter((oldCart: any) => oldCart.id !== id))
    );
    dispatch({ type: actionType.LOGIN });
  };
  useEffect(() => {
    dispatch({
      type: actionType.SET_BREADCUMB,
      payload: [{ name: "Giỏ hàng", url: null }],
    });
  }, []);
  useEffect(() => {
    if (!sessionStorage.getItem("account")) {
      console.error("account nulll error");
      return;
    }

    SetCarts(
      JSON.parse(sessionStorage.getItem("carts") as any)
        ? JSON.parse(sessionStorage.getItem("carts") as any)
        : []
    );
  }, [rootState]);
  console.log(carts);
  return (
    <div className="container">
      <div className="cart-detail mt-lg-3 mb-3 px-3 py-lg-4 mt-5 pt-5">
        <div className="cart-detail-head mb-3">
          <h5>Giỏ hàng</h5>
        </div>
        <div className="cart-detail-body">
          <div className="row g-3">
            <div className="col-12 col-md-8">
              {carts.length > 0 && carts[0].id !== "" ? (
                <CartDetailList
                  carts={carts}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              ) : (
                <div className="alert alert-warning" role="alert">
                  Không có sản phẩm nào. Quay lại{" "}
                  <Link className="text-deco-none text-warning" to={"/"}>
                    <strong>cửa hàng</strong>
                  </Link>{" "}
                  để tiếp tục mua sắm.
                </div>
              )}
            </div>
            <div className="col-12 col-md-4">
              <div className="total-price d-flex justify-content-between align-items-center px-2 py-3">
                <span className="d-block">Tổng tiền</span>
                <span className="d-block number">
                  {formatMoney(
                    carts.reduce(
                      (preValue: number, currentValue: CartResponse) =>
                        preValue + currentValue.price * currentValue.quantity,
                      0
                    )
                  )}{" "}
                  ₫
                </span>
              </div>
              <button
                className="pay-btn d-block w-100 px-2 py-3 text-center mt-3"
                onClick={(e) => e.preventDefault()}
              >
                <Link
                  to="/payment"
                  className="text-deco-none text-white d-block w-100 h-100"
                >
                  Thanh toán
                </Link>
              </button>
              <span className="divide"></span>
              <button className="del-all-btn d-block w-100 px-2 py-3 text-center mt-3">
                Xóa tất cả
              </button>
              <GiftInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
