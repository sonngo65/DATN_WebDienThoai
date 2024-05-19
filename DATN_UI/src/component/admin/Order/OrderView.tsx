import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { OrderAPI, StatisticAPI } from "../../../api";
import {
  checkOrderStatus,
  formatMoney,
  renderPagination,
} from "../../../untils";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
export default function OrderView() {
  const navigate = useNavigate();
  const [orderPage, setOrderPage] = useState<any>({
    pageData: [],
    totalPages: 0,
  });
  const [timeSearch, setTimeSearch] = useState<any>({
    timeStart: "",
    timeEnd: "",
  });
  const handleSearch = () => {
    OrderAPI.getOrdersSearch(
      timeSearch.timeStart,
      timeSearch.timeEnd,
      "0",
      "10"
    )
      .then((data) => setOrderPage(data))
      .catch(() => {
        navigate("/error");
      });
  };
  const handlePagination = (pageNo: number) => {
    if (timeSearch.timeStart || timeSearch.timeStart) {
      OrderAPI.getOrdersSearch(
        timeSearch.timeStart,
        timeSearch.timeEnd,
        pageNo.toString(),
        "10"
      )
        .then((data) => setOrderPage(data))
        .catch(() => {
          navigate("/error");
        });
      return;
    }
    OrderAPI.getAll(pageNo.toString())
      .then((data) => {
        setOrderPage(data);
      })
      .catch(() => {
        navigate("/error");
      });
  };
  const handleCancel = (e: React.MouseEvent, order: any) => {
    e.preventDefault();
    if (order)
      OrderAPI.updateStatus({ orderId: order.id, status: 1 })
        .then((data) => {
          setOrderPage((pre: any) => {
            return {
              ...pre,
              pageData: pre.pageData.map((preOder: any) => {
                if (preOder.id === order.id) return { ...preOder, status: 1 };
                else return preOder;
              }),
            };
          });
        })
        .catch(() => {
          navigate("/error");
        });
  };
  const handleComfirm = (e: React.MouseEvent, order: any) => {
    e.preventDefault();
    if (order)
      OrderAPI.updateStatus({ orderId: order.id, status: 2 })
        .then((data) => {
          setOrderPage((pre: any) => {
            return {
              ...pre,
              pageData: pre.pageData.map((preOder: any) => {
                if (preOder.id === order.id) return { ...preOder, status: 2 };
                else return preOder;
              }),
            };
          });
        })
        .catch(() => {
          navigate("/error");
        });
  };
  const renderStatus = (status: number) => {
    switch (status) {
      case 0:
        return <span className="text-primary">{checkOrderStatus(status)}</span>;
      case 1:
        return <span className="text-danger">{checkOrderStatus(status)}</span>;
      case 2:
        return <span className="text-warning">{checkOrderStatus(status)}</span>;
      case 3:
        return <span className="text-success">{checkOrderStatus(status)}</span>;
    }
    return <span>{checkOrderStatus(status)}</span>;
  };
  useEffect(() => {
    OrderAPI.getAll()
      .then((data) => setOrderPage(data))
      .catch(() => {
        navigate("/error");
      });
  }, []);

  return (
    <div className="vh-100 overflow-y-auto">
      <Navbar title="Quản lý sản phẩm" />
      <div className="control-bar p-2 py-4 bg-white rounded  my-2 mx-3  d-flex justify-content-end align-item-center">
        <div className="d-flex position-relative me-3 ">
          <div className="">
            <input
              className="form-control"
              type="date"
              id="timeStart"
              onChange={(e) => {
                setTimeSearch((pre: any) => ({
                  ...pre,
                  timeStart: e.target.value,
                }));
              }}
            />
          </div>
          <div className="">
            <input
              className="form-control"
              type="date"
              id="timeEnd"
              onChange={(e) => {
                setTimeSearch((pre: any) => ({
                  ...pre,
                  timeEnd: e.target.value,
                }));
              }}
            />
          </div>
        </div>{" "}
        <div className="btn">
          <div className="btn btn-outline-primary" onClick={handleSearch}>
            Tìm kiếm
          </div>
        </div>
        <div className="btn">
          <button className="btn btn-outline-success">Thêm</button>
        </div>
      </div>
      <div className="mx-3 rounded overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã khách hàng</th>
              <th scope="col"> sản phẩm</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Thành tiền</th>
              <th scope="col">Thời gian đặt</th>
              <th scope="col" colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {orderPage.pageData.map((order: any, index: number) => {
              return (
                <tr className="align-middle">
                  <th scope="row">{index + 1}</th>
                  <td>
                    <p>Tên: {order.account.username}</p>{" "}
                    <p>
                      Số điện thoại: {order.account.receiveInfo.phoneNumber}
                    </p>
                  </td>

                  <td>
                    {order.products.map((product: any) => {
                      return (
                        <li className="payment-products-it border rounded p-1 mb-2">
                          <div className="img">
                            <img src={product.image} alt="" />
                            <span className="quantity">{product.quantity}</span>
                          </div>
                          <div className="info d-flex justify-content-between align-items-center">
                            <div className="left">
                              <p className="name mb-0">{product.name}</p>
                              <span className="options">
                                {product.optionName}
                              </span>
                            </div>
                            <div className="right">
                              <span className="price">
                                {formatMoney(product.price)}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}{" "}
                  </td>

                  <td>{renderStatus(order.status)}</td>
                  <td>
                    <span className="color-price fw-bold">
                      {formatMoney(
                        order.products.reduce(
                          (preValue: number, currentValue: any) => {
                            return (
                              preValue +
                              currentValue.quantity * currentValue.price
                            );
                          },
                          0
                        )
                      )}{" "}
                    </span>
                  </td>
                  <td>
                    {format(new Date(order.orderedTime), "HH:mm dd-MM-yyyy")}
                  </td>

                  <td colSpan={2}>
                    <div className="d-flex justify-content-around">
                      {order.status === 0 && (
                        <>
                          {" "}
                          <button
                            className="update-btn p-1 btn btn-outline-warning"
                            onClick={(e) => handleComfirm(e, order)}
                          >
                            Xác nhận
                          </button>{" "}
                          <button
                            className="delete-btn p-1 btn btn-outline-danger"
                            onClick={(e) => handleCancel(e, order)}
                          >
                            Hủy
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {/* <tr className="align-middle">
              <th scope="row">1</th>
              <td>Samsung qwe wqeqw eqwe qwe </td>

              <td>Samsung qwe wqeqw eqwe qwe </td>

              <td>
                <img
                  className="product-img"
                  src="./product-detail1.webp"
                  alt="error"
                />
              </td>
              <td>Samsung qwe wqeqw eqwe qwe </td>
              <td>
                <span className="text-success">Con hang</span>
              </td>
              <td>213</td>
              <td>23</td>

              <td colSpan={2}>
                <div className="d-flex justify-content-around">
                  <button className="update-btn p-1 btn btn-outline-warning text-warning">
                    Sua
                  </button>
                  <button className="delete-btn p-1 btn btn-outline-danger">
                    xoa
                  </button>
                </div>
              </td>
            </tr>
            <tr className="align-middle">
              <th scope="row">2</th>
              <td>Samsung qwe wqeqw eqwe qwe </td>

              <td>Samsung qwe wqeqw eqwe qwe </td>

              <td>
                <img
                  className="product-img"
                  src="./product-detail2.webp"
                  alt="error"
                />
              </td>
              <td>Iphone</td>
              <td>
                <span className="text-danger">Het hang</span>
              </td>
              <td>213</td>
              <td>23</td>

              <td colSpan={2}>
                <div className="d-flex justify-content-around">
                  <button className="update-btn p-1 btn btn-outline-warning text-warning">
                    Sua
                  </button>
                  <button className="delete-btn p-1 btn btn-outline-danger">
                    xoa
                  </button>
                </div>
              </td>
            </tr>
            <tr className="align-middle">
              <th scope="row">23</th>
              <td>Samsung qwe wqeqw eqwe qwe </td>

              <td>Samsung qwe wqeqw eqwe qwe </td>

              <td>
                <img
                  className="product-img"
                  src="./product-detail3.webp"
                  alt="error"
                />
              </td>
              <td>Galaxy</td>
              <td>
                <span className="text-danger">Het hang</span>
              </td>
              <td>213</td>
              <td>23</td>

              <td colSpan={2}>
                <div className="d-flex justify-content-around">
                  <button className="update-btn p-1 btn btn-outline-warning text-warning">
                    Xác nhận
                  </button>
                  <button className="delete-btn p-1 btn btn-outline-danger">
                    Hủy
                  </button>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
        {renderPagination(orderPage.totalPages, handlePagination)}
      </div>
    </div>
  );
}
