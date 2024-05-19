import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegUser, FaRegCircleUser } from "react-icons/fa6";
import { RiFilePaper2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { OrderAPI } from "../../../api";
import { checkOrderStatus, formatMoney } from "../../../untils";
import * as ActionType from "../../../store/actionTypes";
import { useDispatch } from "react-redux";

export default function OrderHistory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState<any>([]);
  const [filter, setFilter] = useState<number | boolean>(true);
  const [controlBarList, setControlBarList] = useState([
    {
      id: 1,
      name: "Tất cả",
      status: true,
      isActive: true,
    },
    {
      id: 2,
      name: "Chờ xác nhận",
      status: 0,
      isActive: false,
    },
    {
      id: 3,
      name: "Đang giao",
      status: 2,
      isActive: false,
    },
    {
      id: 4,
      name: "Hoàn thành",
      status: 3,
      isActive: false,
    },
    {
      id: 5,
      name: "Đã hủy",
      status: 1,
      isActive: false,
    },
  ]);
  useEffect(() => {
    OrderAPI.getAllByAccountId(
      JSON.parse(sessionStorage.getItem("account") as any).id
    )
      .then((data) => {
        setOrders(data);
      })
      .catch(() => {
        navigate("/error");
      });
    dispatch({
      type: ActionType.SET_BREADCUMB,
      payload: [{ name: "Lịch sử đặt hàng", url: null }],
    });
  }, []);
  const handleCancel = (e: React.MouseEvent, order: any) => {
    e.preventDefault();
    if (order)
      OrderAPI.updateStatus({ orderId: order.id, status: 1 })
        .then((data) => {
          setOrders((pre: any) => {
            return pre.map((preOder: any) => {
              if (preOder.id === order.id) return { ...preOder, status: 1 };
              else return preOder;
            });
          });
        })
        .catch(() => {
          navigate("/error");
        });
  };
  const handleConfirm = (e: React.MouseEvent, order: any) => {
    e.preventDefault();
    if (order)
      OrderAPI.updateStatus({ orderId: order.id, status: 3 })
        .then((data) => {
          setOrders((pre: any) => {
            return pre.map((preOder: any) => {
              if (preOder.id === order.id) return { ...preOder, status: 3 };
              else return preOder;
            });
          });
        })
        .catch(() => {
          navigate("/error");
        });
  };
  console.log(orders);

  return (
    <div className="order-history my-4 mt-5 pt-5 mt-lg-4 pt-lg-0">
      <div className="container">
        <div className="row">
          {/* <div className="col-3">
            <div className="profile px-2 d-flex align-items-center pb-2">
              <div className="img">
                <FaRegCircleUser />
              </div>
              <div className="info ms-3">
                <h5 className="name m-0">Ngo tat son</h5>
                <a href="#" className="update-pro d-flex align-items-center">
                  <div className="icon me-1">
                    <FaPencilAlt />
                  </div>
                  Chỉnh sửa profile
                </a>
              </div>
            </div>
            <ul className="side-bar-ls list-type-none pt-2">
              <li className="side-bar-it active px-4 py-1">
                <a
                  href=""
                  className="side-bar-li d-flex justify-content-start align-items-center"
                >
                  <div className="icon me-2">
                    <FaRegUser />
                  </div>
                  Tài khoản của tôi
                </a>
              </li>
              <li className="side-bar-it px-4 py-1">
                <a
                  href=""
                  className="side-bar-li d-flex justify-content-start align-items-center "
                >
                  <div className="icon me-2">
                    <RiFilePaper2Line />
                  </div>
                  Đơn mua
                </a>
              </li>
            </ul>
          </div> */}
          <div className="col-12">
            <div className="order-status position-relative bg-white mb-3">
              <ul className="order-status-ls list-type-none  position-absolute d-flex justify-content-between align-items-center">
                {controlBarList.map((controlBarItem) => {
                  return (
                    <li
                      className={`order-status-it  ${
                        controlBarItem.isActive ? "active" : ""
                      }`}
                      key={controlBarItem.id}
                    >
                      <a
                        href="#"
                        className="order-status-li  text-center d-block px-3 py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setFilter(controlBarItem.status);
                          setControlBarList((pre) =>
                            pre.map((preControlBar) => {
                              if (preControlBar.id === controlBarItem.id)
                                return { ...preControlBar, isActive: true };
                              else return { ...preControlBar, isActive: false };
                            })
                          );
                        }}
                      >
                        {controlBarItem.name}
                      </a>
                    </li>
                  );
                })}

                {/* <li className="order-status-it w-100">
                  <a
                    href="#"
                    className="order-status-li text-center d-block px-3 py-2"
                  >
                    Chờ thanh toán
                  </a>
                </li>
                <li className="order-status-it w-100">
                  <a
                    href="#"
                    className="order-status-li text-center d-block px-3 py-2"
                  >
                    vẩn chuyên
                  </a>
                </li>
                <li className="order-status-it w-100">
                  <a
                    href="#"
                    className="order-status-li text-center d-block px-3 py-2"
                  >
                    Chờ giao hàng
                  </a>
                </li>
                <li className="order-status-it w-100">
                  <a
                    href="#"
                    className="order-status-li text-center d-block px-3 py-2"
                  >
                    hoan thanh
                  </a>
                </li>
                <li className="order-status-it w-100">
                  <a
                    href="#"
                    className="order-status-li text-center d-block px-3 py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setFilter(1);
                    }}
                  >
                    Đã hủy
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="order">
              <ul className="order-ls list-type-none">
                {orders.map((order: any) => {
                  if (order.status === filter || filter === true)
                    return (
                      <li className="order-it rounded bg-white px-3 py-4 mb-3">
                        <div className="head text-end pb-2">
                          {" "}
                          <span>{checkOrderStatus(order.status)}</span>
                        </div>
                        <ul className="product-ls py-3 list-type-none">
                          {order.products.map((product: any) => {
                            return (
                              <li className="product-it py-2">
                                <a
                                  href="#"
                                  className="product-li d-flex align-items-center"
                                >
                                  <div className="img">
                                    <img src={product.image} alt="" />
                                  </div>
                                  <div className="info d-sm-flex justify-content-between w-100">
                                    <div className="left pe-3 ">
                                      <div className="name">{product.name}</div>
                                      <div className="options">
                                        {product.optionName}
                                      </div>
                                      <div className="quantity">
                                        x{product.quantity}
                                      </div>
                                    </div>
                                    <div className="right ">
                                      <div className="price d-flex align-items-center">
                                        <strong>
                                          {formatMoney(product.price)} ₫
                                        </strong>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="total-price text-end my-3">
                          Thành tiền:{" "}
                          <strong>
                            {order.products.reduce(
                              (preValue: number, currentValue: any) => {
                                return (
                                  preValue +
                                  currentValue.price * currentValue.quantity
                                );
                              },
                              0
                            )}
                            ₫
                          </strong>
                        </div>
                        <div className="button text-end">
                          {order.status === 0 && (
                            <button
                              className="btn btn-outline-primary"
                              onClick={(e) => handleCancel(e, order)}
                            >
                              Hủy đơn hàng
                            </button>
                          )}
                          {order.status === 2 && (
                            <button
                              className="btn btn-outline-primary"
                              onClick={(e) => handleConfirm(e, order)}
                            >
                              Xác nhận đã nhận hàng
                            </button>
                          )}
                        </div>
                      </li>
                    );
                })}
                {/* <li className="order-it rounded bg-white px-3 py-4 mb-3">
                  <ul className="product-ls py-3 list-type-none">
                    <li className="product-it py-2">
                      <a
                        href="#"
                        className="product-li d-flex align-items-center"
                      >
                        <div className="img">
                          <img src="./product-detail1.webp" alt="" />
                        </div>
                        <div className="info">
                          <div className="left pe-3">
                            <div className="name">
                              Bịt Mắt 3D Khi Ngủ, Mặt Nạ Ngủ Nam Nữ Thoáng Khí
                              Và Mềm Mại, Tiện Dụng Ngủ Trưa Văn Phòng, Trên Xe
                              Ôtô. TakyHome 5130
                            </div>
                            <div className="options">Den, 128gb</div>
                            <div className="quantity">x1</div>
                          </div>
                          <div className="right d-flex justify-content-end align-items-center">
                            <div className="price">
                              <strong>28.420₫</strong>
                              <span className="strike">29.000₫</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="product-it py-2">
                      <a
                        href="#"
                        className="product-li d-flex align-items-center"
                      >
                        <div className="img">
                          <img src="./product-detail1.webp" alt="" />
                        </div>
                        <div className="info">
                          <div className="left pe-3">
                            <div className="name">
                              Bịt Mắt 3D Khi Ngủ, Mặt Nạ Ngủ Nam Nữ Thoáng Khí
                              Và Mềm Mại, Tiện Dụng Ngủ Trưa Văn Phòng, Trên Xe
                              Ôtô. TakyHome 5130
                            </div>
                            <div className="options">Den, 128gb</div>
                            <div className="quantity">x1</div>
                          </div>
                          <div className="right d-flex justify-content-end align-items-center">
                            <div className="price">
                              <strong>28.420₫</strong>
                              <span className="strike">29.000₫</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div className="total-price text-end my-3">
                    Thanh tien: <strong>28.420₫</strong>
                  </div>
                  <div className="button text-end">
                    <button className="btn btn-outline-primary">
                      huy don hang
                    </button>
                  </div>
                </li>
                <li className="order-it rounded bg-white px-3 py-4">
                  <ul className="product-ls py-3 list-type-none">
                    <li className="product-it py-2">
                      <a
                        href="#"
                        className="product-li d-flex align-items-center"
                      >
                        <div className="img">
                          <img src="./product-detail1.webp" alt="" />
                        </div>
                        <div className="info">
                          <div className="left pe-3">
                            <div className="name">
                              Bịt Mắt 3D Khi Ngủ, Mặt Nạ Ngủ Nam Nữ Thoáng Khí
                              Và Mềm Mại, Tiện Dụng Ngủ Trưa Văn Phòng, Trên Xe
                              Ôtô. TakyHome 5130
                            </div>
                            <div className="options">Den, 128gb</div>
                            <div className="quantity">x1</div>
                          </div>
                          <div className="right d-flex justify-content-end align-items-center">
                            <div className="price">
                              <strong>28.420₫</strong>
                              <span className="strike">29.000₫</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                  <div className="total-price text-end my-3">
                    Thanh tien: <strong>28.420₫</strong>
                  </div>
                  <div className="button text-end">
                    <button className="btn btn-outline-primary">
                      huy don hang
                    </button>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
