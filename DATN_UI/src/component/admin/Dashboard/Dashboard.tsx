import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Chart } from "chart.js";
import { useEffect, useState } from "react";
import MyChart from "../Chart/Chart";
import moment from "moment";
import { ProductAPI, StatisticAPI } from "../../../api";
import {
  checkOrderStatus,
  formatMoney,
  renderPagination,
} from "../../../untils";
import { format } from "date-fns";
import { time, timeEnd } from "console";
import { statisticAll } from "../../../api/productAPI";
import { order } from "../../../api/orderAPI";
import { Link, useNavigate } from "react-router-dom";
let chart: any;
export default function Dashboard() {
  const navigate = useNavigate();
  const [latestWeekStatistic, setLatestWeekStatistic] = useState<any>({
    totalErning: 0,
    totalSales: 0,
    erningCompareLastWeek: 0,
    salesCompareLastWeek: 0,
  });
  const [allStatistic, setAllStatistic] = useState<any>({
    totalErning: 0,
    totalAccounts: 0,
    totalOrders: 0,
    totalCategories: 0,
    totalNews: 0,
    totalProducts: 0,
  });
  const [saleProductStatistic, setSaleProductStatistic] = useState<any>({
    totalErning: 0,
    totalOrders: 0,
    totalSaleProducts: 0,
  });
  const [orderPage, setOrderPage] = useState<any>({
    totalPages: 0,
    pageData: [],
  });
  const [timeStatistic, setTimeStatistic] = useState<any>({
    timeStart: "",
    timeEnd: "",
  });
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

  const handleSubmit = (e: React.MouseEvent) => {
    StatisticAPI.getSaleProductStatistic(
      timeStatistic.timeStart,
      timeStatistic.timeEnd
    )
      .then((data) => {
        setSaleProductStatistic(data);
      })
      .catch(() => {
        navigate("/error");
      });
    StatisticAPI.getOrdersStatistic(
      timeStatistic.timeStart,
      timeStatistic.timeEnd
    )
      .then((data) => setOrderPage(data))
      .catch(() => {
        navigate("/error");
      });
  };

  const handlePagination = (pageNo: number) => {
    StatisticAPI.getOrdersStatistic(
      timeStatistic.timeStart,
      timeStatistic.timeEnd,
      pageNo.toString()
    )
      .then((data) => setOrderPage(data))
      .catch(() => {
        navigate("/error");
      });
  };

  useEffect(() => {
    ProductAPI.statisticAll()
      .then((data) => {
        setLatestWeekStatistic(data);
      })
      .catch(() => {
        navigate("/error");
      });
    StatisticAPI.getStatistic()
      .then((data) => {
        setAllStatistic(data);
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);

  return (
    <div className="dashboard px-3">
      <h4 className="mt-4 border-bottom border-top  py-3">Thống kế tất cả</h4>
      <div className="row">
        <div className="col-4">
          <div className="title py-3  d-flex justify-content-start align-items-center">
            <h5>Tổng tiền kiếm:</h5>
            <div className="icon  ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2 text-success">
              {formatMoney(allStatistic.totalErning)} ₫
            </h3>
          </div>
        </div>
        <div className="col-4">
          <div className="title py-3  d-flex justify-content-start align-items-center">
            <h5>Tổng số đặt hàng:</h5>
            <div className="icon  ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2 text-success">
              {allStatistic.totalOrders}{" "}
            </h3>
          </div>
        </div>
        <div className="col-4">
          <div className="title py-3  d-flex justify-content-start align-items-center ">
            <h5>Số lượng tài khoản</h5>
            <div className="icon ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2 text-success">
              {allStatistic.totalAccounts}
            </h3>
          </div>
        </div>
        <div className="col-4">
          <div className="title py-3  d-flex justify-content-start align-items-center">
            <h5>Số sản phẩm:</h5>
            <div className="icon  ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2 text-success">
              {allStatistic.totalProducts}
            </h3>
          </div>
        </div>
        <div className="col-4">
          <div className="title py-3  d-flex justify-content-start align-items-center">
            <h5>Số lượng danh mục:</h5>
            <div className="icon  ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2 text-success">
              {allStatistic.totalCategories}{" "}
            </h3>
          </div>
        </div>
        <div className="col-4">
          <div className="title py-3  d-flex justify-content-start align-items-center ">
            <h5>Số lượng tin tức</h5>
            <div className="icon ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2 text-success">{allStatistic.totalNews}</h3>
          </div>
        </div>
      </div>
      <h4 className="mt-4 border-bottom border-top py-3">
        Thống kê trong tuần
      </h4>
      <div className="row">
        <div className="col-4">
          <div className="title py-3  d-flex justify-content-start align-items-center">
            <h5>Total Erning</h5>
            <div className="icon  ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2 text-success">
              {formatMoney(latestWeekStatistic.totalErning)} ₫
            </h3>
            {latestWeekStatistic.erningCompareLastWeek < 0 ? (
              <div className="detail">
                <span className="rounded-pill px-2 text-danger">
                  <span className="icon me-2">
                    <FaArrowTrendDown className="text-danger" />
                  </span>
                  {formatMoney(latestWeekStatistic.erningCompareLastWeek * -1)}{" "}
                  ₫
                </span>
                <span className="ms-3 text-gray opacity-50">
                  than last week
                </span>
              </div>
            ) : (
              <div className="detail">
                <span className="rounded-pill px-2 text-success">
                  <span className="icon me-2">
                    <FaArrowTrendUp className="text-success" />
                  </span>
                  {formatMoney(latestWeekStatistic.erningCompareLastWeek)} ₫
                </span>
                <span className="ms-3 text-gray opacity-50">
                  than last week
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="title py-3  d-flex justify-content-start align-items-center">
            <h5>Total Order</h5>
            <div className="icon  ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2 text-success">
              {latestWeekStatistic.totalSales}{" "}
            </h3>
            {latestWeekStatistic.salesCompareLastWeek < 0 ? (
              <div className="detail">
                <span className="rounded-pill px-2 text-danger">
                  <span className="icon me-2">
                    <FaArrowTrendDown className="text-danger" />
                  </span>
                  {latestWeekStatistic.salesCompareLastWeek * -1}
                </span>
                <span className="ms-3 text-gray opacity-50">
                  than last week
                </span>
              </div>
            ) : (
              <div className="detail">
                <span className="rounded-pill px-2 text-success">
                  <span className="icon me-2">
                    <FaArrowTrendUp className="text-success" />
                  </span>
                  {latestWeekStatistic.salesCompareLastWeek}
                </span>
                <span className="ms-3 text-gray opacity-50">
                  than last week
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-4">
          {/* <div className="title py-3  d-flex justify-content-start align-items-center ">
            <h5>Bound Rate</h5>
            <div className="icon ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>
          <div className="info">
            <h3 className="mt-3 mb-2">45.80%</h3>
            <div className="detail">
              <span className="rounded-pill px-2  text-success">
                <span className="icon me-2">
                  <FaArrowTrendUp className=" text-success" />
                </span>
                12.80%
              </span>
              <span className="ms-3 text-gray opacity-50">than last week</span>
            </div>
          </div> */}
        </div>
      </div>
      <h4 className="mt-4  border-bottom border-top py-3">Thống kê biểu đồ</h4>
      <div className="row">
        <div className="col-12">
          <div className="title py-3  d-flex justify-content-start align-items-center">
            <h5>Order Total</h5>
            <div className="icon ms-2">
              <IoIosInformationCircleOutline />
            </div>
          </div>

          <MyChart />
        </div>
      </div>
      <h4 className="mt-4  border-bottom border-top py-3">
        Thống kê theo thời gian
      </h4>
      <div className="row mt-3">
        <div className="col-4">
          <input
            className="form-control"
            type="date"
            id="timeStart"
            onChange={(e) => {
              setTimeStatistic((pre: any) => ({
                ...pre,
                timeStart: e.target.value,
              }));
            }}
          />
        </div>
        <div className="col-4">
          <input
            className="form-control"
            type="date"
            id="timeEnd"
            onChange={(e) => {
              setTimeStatistic((pre: any) => ({
                ...pre,
                timeEnd: e.target.value,
              }));
            }}
          />
        </div>
        <div className="col-4">
          <button className="btn btn-outline-primary" onClick={handleSubmit}>
            Thống kê
          </button>
        </div>
        <div className="row mt-5">
          <div className="col-4">
            <p>
              Tổng tiền:{" "}
              <span className="text-success">
                {formatMoney(saleProductStatistic.totalErning)} ₫
              </span>
            </p>
          </div>

          <div className="col-4">
            <p>
              Số đơn hàng:{" "}
              <span className="text-success">
                {saleProductStatistic.totalOrders}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p>
              Số sản phẩm đã bán:{" "}
              <span className="text-success">
                {saleProductStatistic.totalSaleProducts}
              </span>
            </p>
          </div>
        </div>
        <div className="rounded overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã khách hàng</th>
                <th scope="col"> sản phẩm</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Thời gian đặt</th>
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
                              <span className="quantity">
                                {product.quantity}
                              </span>
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
                  </tr>
                );
              })}

              {renderPagination(orderPage.totalPages, handlePagination)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
