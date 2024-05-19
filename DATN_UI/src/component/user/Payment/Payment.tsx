import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaArrowLeft, FaMoneyBillAlt } from "react-icons/fa";
import MobilePaymentHead from "./MobilePaymentHead";
import { useSelector } from "react-redux";
import { formatMoney } from "../../../untils";
import { OrderAPI } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../../store/actionTypes";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { order } from "../../../api/orderAPI";
export default function Payment() {
  const stateRoot = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderRequest, setOrderRequest] = useState<OrderRequest>({
    accountId: "",
    optionDetailList: [],
    paymentMethodId: "",
    receiveInfo: { name: "", address: "", note: "", phoneNumber: "" },
  });
  const ref = useRef<any>(null);
  const [validPhoneNumber, setValidPhoneNumber] = useState<any>("");
  const [error, setError] = useState("");
  const [provcAddresses, setProvcAddresses] = useState([
    {
      id: 1,
      name: "Lao Cai",
      isSelected: false,
    },
    {
      id: 2,
      name: "Lang Son",
      isSelected: false,
    },
    {
      id: 3,
      name: "Yen Bai",
      isSelected: false,
    },
    {
      id: 4,
      name: "Son La",
      isSelected: false,
    },
    {
      id: 5,
      name: "Bac Giang",
      isSelected: false,
    },
    {
      id: 6,
      name: "Son La",
      isSelected: false,
    },
    {
      id: 7,
      name: "Bac Giang",
      isSelected: false,
    },
    {
      id: 8,
      name: "Son La",
      isSelected: false,
    },
    {
      id: 9,
      name: "Bac Giang",
      isSelected: false,
    },
  ]);
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    addressDetail: "",
    description: "",
    paymentMethod: "",
    dealCode: "",
  });
  useLayoutEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("account") as any)) {
      console.log("waeqw");
      dispatch({ type: actionType.NOT_LOGIN });
      navigate("/");
      return;
    }
    const invalidCarts = JSON.parse(
      sessionStorage.getItem("carts") as any
    ).filter((cart: any) => cart.status === 2);
    if (invalidCarts && invalidCarts.length > 0) {
      window.alert(
        `Sản phẩm ${invalidCarts.map(
          (invalidCart: any) =>
            `\n${invalidCart.name} (${invalidCart.optionName})`
        )}  \nHết hàng`
      );
      navigate("/cart");
    }
  }, []);
  useEffect(() => {
    // setProducts(JSON.parse(sessionStorage.getItem("carts") as any));

    setOrderRequest((pre) => ({
      ...pre,
      accountId: JSON.parse(sessionStorage.getItem("account") as any).id,
      optionDetailList: JSON.parse(sessionStorage.getItem("carts") as any),
      receiveInfo: JSON.parse(sessionStorage.getItem("account") as any)
        .receiveInfo
        ? JSON.parse(sessionStorage.getItem("account") as any).receiveInfo
        : pre.receiveInfo,
    }));
  }, [stateRoot]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    setOrderRequest((pre: any) => ({
      ...pre,
      receiveInfo: { ...pre?.receiveInfo, [name]: value },
    }));
  };
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validPhoneNumber) {
      setError(validPhoneNumber);
      return;
    }
    OrderAPI.order(orderRequest)
      .then((data) => {
        sessionStorage.setItem(
          "account",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("account") as any),
            receiveInfo: data,
          })
        );
      })
      .catch(() => {
        navigate("/error");
      });
    sessionStorage.setItem("carts", JSON.stringify([]));
    dispatch({ type: actionType.LOGIN, payload: "" });
    navigate("/");
  };
  console.log(orderRequest);
  return (
    <>
      <div className="payment px-lg-3 px-3 px-x-0">
        <div className="cus-container">
          <div className="payment-head">
            <div className="row">
              <div className="col-lg-4 col-12">
                <div className="logo">
                  <img src="logo1.png" alt="error" />
                </div>
              </div>
              <MobilePaymentHead
                optionDetailList={orderRequest.optionDetailList}
              />
            </div>
          </div>
          <div className="row g-lg-5">
            <div className="col-12 col-lg-4">
              <div className="title">
                <h5>Thông tin nhận hàng</h5>
              </div>
              <form action="#">
                {/* <Input name="full-name" label="Họ và tên" />
                <Input name="phoneNumber" label="Số điện thoại" />
                <Input name="address" label="Địa chỉ" />

                <SelectInput
                  label="Tỉnh thành"
                  setOptions={setProvcAddresses}
                  options={provcAddresses}
                />
                <SelectInput
                  label="Quận huyện"
                  setOptions={setProvcAddresses}
                  options={provcAddresses}
                />
                <SelectInput
                  label="Xã phường"
                  setOptions={setProvcAddresses}
                  options={provcAddresses}
                /> */}
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="name"
                    value={
                      orderRequest.receiveInfo
                        ? orderRequest.receiveInfo.name
                        : ""
                    }
                    onChange={handleChange}
                  />
                  <label htmlFor="">Họ tên</label>
                </div>
                <div className="mb-3 form-floating">
                  <PhoneInput
                    ref={ref}
                    className="form-control "
                    onChange={(e) => {
                      console.log(e);
                      setError("");
                      setOrderRequest((pre: any) => ({
                        ...pre,
                        receiveInfo: { ...pre?.receiveInfo, phoneNumber: e },
                      }));
                      if (!e) {
                        setValidPhoneNumber("Không được để trống");
                        return;
                      }
                      if (e && !isValidPhoneNumber(e.toString(), "VN")) {
                        setValidPhoneNumber("Số điện thoại không hợp lệ");
                      } else {
                        setValidPhoneNumber("");
                      }
                    }}
                    defaultCountry="VN"
                    value={orderRequest.receiveInfo.phoneNumber}
                  />
                  <label className="bg-transparent" htmlFor="">
                    Số điện thoại
                  </label>
                  {error && <p className="m-0 mt-2 text-danger">{error}</p>}
                </div>
                {/* <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="phoneNumber"
                    value={
                      orderRequest.receiveInfo
                        ? orderRequest.receiveInfo.phoneNumber
                        : ""
                    }
                    onFocus={() => {
                      console.log(ref.current);
                      ref.current.focus();
                    }}
                  />
                  <label htmlFor="">Số điện thoại</label>
                </div> */}
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="address"
                    value={
                      orderRequest.receiveInfo
                        ? orderRequest.receiveInfo.address
                        : ""
                    }
                    onChange={handleChange}
                  />
                  <label htmlFor="">Địa chỉ</label>
                </div>
                <div className="form-floating w-100">
                  <textarea
                    name="description"
                    id="note"
                    cols={30}
                    rows={40}
                    placeholder=""
                    className="form-control w-100"
                    style={{ height: "100px" }}
                    value={
                      orderRequest.receiveInfo
                        ? orderRequest.receiveInfo.note
                        : ""
                    }
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="1">Ghi chú</label>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-4">
              <div className="title">
                <h5>Vận chuyển</h5>
              </div>
              <div className="alert alert-success">
                <p className="p-0 m-0">Vui lòng nhập thông tin giao hàng</p>
              </div>
              <div className="title"></div>
              <div className="payment-methods">
                <ul className="payment-methods-ls list-type-none">
                  <li className="payment-methods-it">
                    <input
                      className="input-radio"
                      type="radio"
                      id="radio_1"
                      name="payment"
                      checked={true}
                    />
                    <label className="ms-2" htmlFor="radio_1">
                      Thanh toán khi nhận hàng
                    </label>
                    <div className="icon">
                      <FaMoneyBillAlt />
                    </div>
                  </li>
                  {/* <li className="payment-methods-it">
                    <input
                      className="input-radio"
                      type="radio"
                      id="radio_2"
                      name="payment"
                    />
                    <label className="ms-2" htmlFor="radio_2">
                      Thanh toán chuyển khoản QR
                    </label>
                    <div className="icon">
                      <i className="icon-pay-2"></i>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="side-bar d-lg-block d-none">
                {" "}
                <div className="payment-products">
                  <div className="title">
                    <h5>
                      Đơn hàng (
                      {orderRequest.optionDetailList.reduce(
                        (preValue: number, currentValue: CartResponse) => {
                          return preValue + currentValue.quantity;
                        },
                        0
                      )}
                      )
                    </h5>
                  </div>
                  <ul className="payment-products-ls m-0 p-0">
                    {orderRequest.optionDetailList.map((product) => {
                      return (
                        <li className="payment-products-it">
                          <div className="img">
                            <img src={product.image} alt="" />
                            <span className="quantity">{product.quantity}</span>
                          </div>
                          <div className="info d-flex justify-content-between align-items-center">
                            <div className="left">
                              <p className="name">{product.name}</p>
                              <span className="options">
                                {product.optionName}
                              </span>
                            </div>
                            <div className="right">
                              <span className="price">
                                {formatMoney(product.price)} ₫
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* <div className="payment-deal py-4 d-flex justify-content-between align-items-center">
                  <div className="input-group w-auto">
                    <input className="input " type="text" id="pay-deal" />
                    <label htmlFor="pay-deal">Nhập mã giảm giá</label>
                  </div>
                  <button className="btn btn-primary">Áp dụng</button>
                  <button className="btn btn-primary" disable>Ap dung</button>
                </div> */}
                <div className="payment-price py-4">
                  <p className="d-flex justify-content-between align-items-center ">
                    Tạm tính :{" "}
                    <span>
                      {formatMoney(
                        orderRequest.optionDetailList.reduce(
                          (preValue: number, currentValue: CartResponse) => {
                            return (
                              preValue +
                              currentValue.price * currentValue.quantity
                            );
                          },
                          0
                        )
                      )}{" "}
                      ₫
                    </span>
                  </p>
                  {/* <p className="d-flex justify-content-between align-items-center">
                    Phí vận chuyển : <span></span>
                  </p> */}
                </div>
                <div className="payment-total py-4">
                  <p className="d-flex justify-content-between align-items-center">
                    Tổng cộng:{" "}
                    <span className="text-primary d-inline-block">
                      {formatMoney(
                        orderRequest.optionDetailList.reduce(
                          (preValue: number, currentValue: CartResponse) => {
                            return (
                              preValue +
                              currentValue.price * currentValue.quantity
                            );
                          },
                          0
                        )
                      )}{" "}
                      ₫
                    </span>
                  </p>
                </div>
                <div className="payment-btn py-4 d-flex justify-content-between align-items-center">
                  <a className="d-block text-deco-none" href="#">
                    <FaArrowLeft />
                    <Link className="text-deco-none" to="/cart">
                      <span className="ms-2">Quay về giỏ hàng </span>
                    </Link>
                  </a>
                  <button
                    className="d-block btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 d-lg-none d-block my-4">
              <button
                className="d-block btn btn-primary w-100"
                onClick={handleSubmit}
              >
                Đặt hàng
              </button>

              <a
                className="d-block text-deco-none w-100 text-center mt-2"
                href="#"
              >
                <FaArrowLeft />
                <span className="ms-2 ">
                  <Link className="text-deco-none" to="/cart">
                    Quay về giỏ hàng
                  </Link>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
