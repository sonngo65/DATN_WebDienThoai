import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { OrderAPI, ProductAPI, fileAPI, url } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney, renderPagination } from "../../../untils";
import ConfirmForm from "../ConfirmForm";
import Notify from "../Notify/Notify";
export default function ProductView() {
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
  } | null>(null);

  const [confirm, setConfirm] = useState<{ isShow: boolean; id: string }>({
    isShow: false,
    id: "",
  });
  const [nameSearch, setNameSearch] = useState("");
  const [productPage, setProductPage] = useState<any>({
    pageData: [],
    currentPageNo: 0,
    totalPages: 0,
  });
  const handleDeleteClick = (id: string) => {
    setConfirm((pre) => ({ isShow: true, id: id }));
  };

  const handleConfirm = (id: string) => {
    ProductAPI.deleteById(id)
      .then(() => {
        SetNotify({ value: "Xóa thành công", isSuccess: true });
        if (productPage.pageData.length <= 1) {
          ProductAPI.getAll((productPage.currentPageNo - 1).toString()).then(
            (data) => {
              setProductPage({
                ...data,
                currentPageNo: productPage.currentPageNo - 1,
              });
            }
          );
          return;
        }
        ProductAPI.getAll(productPage.currentPageNo.toString()).then((data) => {
          setProductPage({ ...data, currentPageNo: productPage.currentPageNo });
        });
      })
      .catch(() => {
        navigate("/error");
      });
  };
  const handlePagination = (pageNo: number) => {
    if (nameSearch) {
      ProductAPI.getProductsByNameSearch(
        nameSearch,
        pageNo.toString(),
        "10"
      ).then((data) => {
        setProductPage({ ...data, currentPageNo: pageNo });
      });
      return;
    }
    ProductAPI.getAll(pageNo.toString())
      .then((data) => {
        setProductPage({ ...data, currentPageNo: pageNo });
      })
      .catch(() => {
        navigate("/error");
      });
  };

  const handleSearch = () => {
    ProductAPI.getProductsByNameSearch(nameSearch, "0", "10").then((data) => {
      setProductPage({ ...data, currentPageNo: 0 });
    });
  };
  useEffect(() => {
    ProductAPI.getAll()
      .then((data) => {
        setProductPage({ ...data, currentPageNo: 0 });
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);

  return (
    <>
      <ConfirmForm
        confirm={confirm}
        setConfirm={setConfirm}
        handleClick={handleConfirm}
      />
      {notify && <Notify notify={notify} setNotify={SetNotify} />}
      <div className="vh-100 overflow-y-auto">
        <Navbar title="Quản lý sản phẩm" />
        <div className="control-bar p-2 py-4 bg-white rounded  my-2 mx-3  d-flex justify-content-end align-item-center">
          <div className="search-box position-relative me-3 ">
            <input
              type="text"
              className={"w-100 h-100 rounded"}
              placeholder="search"
              onChange={(e) => {
                setNameSearch(e.target.value);
              }}
            />
            <div className="icon position-absolute top-50  translate-middle-y ">
              <IoSearchOutline />
            </div>
          </div>
          <div className="btn">
            <div className="btn btn-outline-primary" onClick={handleSearch}>
              Tìm kiếm
            </div>
          </div>
          <div className="btn">
            <Link to="/admin/products/add">
              <button className="btn btn-outline-success">Thêm</button>
            </Link>
          </div>
        </div>
        <div className="mx-3 rounded overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên</th>

                <th scope="col">Các phiên bản</th>

                <th scope="col" colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {productPage.pageData.map((product: any, index: number) => {
                return (
                  <tr className="align-middle">
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>
                      {product.optionDetails.map((optionDetail: any) => {
                        return (
                          <li className="payment-products-it  border rounded p-1 mb-2">
                            <div
                              className="img d-inline-block"
                              style={{ width: "80px", flex: "none" }}
                            >
                              <img src={url + optionDetail.image} alt="" />
                              <span className="quantity">
                                {optionDetail.quantity}
                              </span>
                            </div>
                            <div className=" flex-grow-1 d-flex justify-content-between align-items-center">
                              <div className="left">
                                <span className="options me-3">
                                  {optionDetail.option1} /{optionDetail.option2}
                                </span>
                              </div>
                              <div className="me-3">
                                {optionDetail.status === 0 ? (
                                  <span className="text-success">Còn hàng</span>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="right flex-grow-1 pe-2">
                                <span className="price text-nowrap">
                                  {formatMoney(optionDetail.price)} ₫
                                </span>
                                <span className="ms-3 price strike text-nowrap">
                                  {formatMoney(optionDetail.originalPrice)} ₫
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </td>

                    <td colSpan={2}>
                      <div className="d-flex justify-content-around">
                        <Link to={`/admin/products/update/${product.id}`}>
                          <button className="update-btn p-1 btn btn-outline-warning">
                            Sửa
                          </button>
                        </Link>
                        <button
                          className="delete-btn p-1 btn btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteClick(product.id);
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* <tr className="align-middle">
              <th scope="row">2</th>
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
                    Sua
                  </button>
                  <button className="delete-btn p-1 btn btn-outline-danger">
                    xoa
                  </button>
                </div>
              </td>
            </tr> */}
            </tbody>
          </table>
          {renderPagination(productPage.totalPages, handlePagination)}
        </div>
      </div>
    </>
  );
}
