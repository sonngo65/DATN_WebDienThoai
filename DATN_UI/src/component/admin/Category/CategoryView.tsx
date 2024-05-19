import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { CategoryAPI, OrderAPI, ProductAPI, fileAPI, url } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney } from "../../../untils";
import ConfirmForm from "../ConfirmForm";
import Notify from "../Notify/Notify";
export default function CategoryView() {
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
  } | null>(null);
  const [confirm, setConfirm] = useState<{ isShow: boolean; id: string }>({
    isShow: false,
    id: "",
  });
  const [categories, setCategoies] = useState<any>([]);

  const handleDeleteClick = (id: string) => {
    setConfirm((pre) => ({ isShow: true, id: id }));
  };

  const handleConfirm = (id: string) => {
    // ProductAPI.deleteById(id);
    CategoryAPI.deleteById(id).then(() => {
      SetNotify({ value: "Xóa thành công", isSuccess: true });

      setCategoies((pre: any) => {
        return pre.filter((preVendor: any) => preVendor.id !== id);
      });
    });
  };
  useEffect(() => {
    CategoryAPI.getAllGroupChild()
      .then((data) => {
        setCategoies(data);
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
          {/* <div className="search-box position-relative me-3 ">
            <input
              type="text"
              className={"w-100 h-100 rounded"}
              placeholder="search"
            />
            <div className="icon position-absolute top-50  translate-middle-y ">
              <IoSearchOutline />
            </div>
          </div> */}
          <div className="btn">
            <Link to="/admin/categories/add">
              <button className="btn btn-outline-success">them</button>
            </Link>
          </div>
        </div>
        <div className="mx-3 rounded overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Level 1</th>

                <th scope="col">Level 2</th>
                <th scope="col">Level 3</th>
                <th scope="col">Hãng sản xuất</th>

                <th scope="col" colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: any, index: number) => {
                return (
                  <tr className="align-middle">
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className=" category">
                        <span>{category.name}</span>
                        <div className="img">
                          {category.image && (
                            <img src={url + category.image} alt="" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      {category.childCategories &&
                        category.childCategories.map((childCategory: any) => {
                          return (
                            <div className="category  d-flex align-items-center justify-content-between">
                              <span className="me-3">{childCategory.name}</span>
                              <div className="img">
                                {childCategory.image && (
                                  <img src={url + childCategory.image} alt="" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </td>
                    <td>
                      {category.childCategories &&
                        category.childCategories.map((childCategory: any) => {
                          return (
                            childCategory.childCategories &&
                            childCategory.childCategories.map(
                              (childCategory2: any) => {
                                return (
                                  <div className="category d-flex align-items-center justify-content-between ">
                                    <span className="me-3">
                                      {childCategory2.name}
                                    </span>
                                    <div className="img">
                                      {childCategory2.image && (
                                        <img
                                          src={url + childCategory2.image}
                                          alt=""
                                        />
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )
                          );
                        })}
                    </td>
                    <td>
                      {category.vendors.map((vendor: any) => {
                        return (
                          <div className="vendor d-flex align-items-center justify-content-between">
                            <span className="me-3">{vendor.name}</span>
                            <div className="img">
                              {vendor.image && (
                                <img src={url + vendor.image} alt="" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </td>
                    <td colSpan={2}>
                      <div className="d-flex justify-content-around">
                        <Link to={`/admin/categories/update/${category.id}`}>
                          <button className="update-btn p-1 btn btn-outline-warning">
                            Sửa
                          </button>
                        </Link>
                        <button
                          className="delete-btn p-1 btn btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteClick(category.id);
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
        </div>
      </div>
    </>
  );
}
