import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { AccountAPI, OrderAPI, ProductAPI, fileAPI, url } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney, renderPagination } from "../../../untils";

export default function AccountView() {
  const navigate = useNavigate();
  const [accountPage, setAccountPage] = useState<any>({
    pageData: [],
    totalPages: 0,
  });
  const handlePagination = (pageNo: number) => {
    AccountAPI.getAll(pageNo.toString())
      .then((data) => {
        setAccountPage(data);
      })
      .catch(() => {
        navigate("/error");
      });
  };
  useEffect(() => {
    AccountAPI.getAll()
      .then((data) => {
        setAccountPage(data);
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);
  const handleDelete = (id: string) => {
    ProductAPI.deleteById(id);
  };
  return (
    <div className="vh-100 overflow-y-auto">
      <Navbar title="Quản lý Tài khoản" />
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
          <Link to="/admin/accounts/add">
            <button className="btn btn-outline-success">Thêm</button>
          </Link>
        </div>
      </div>
      <div className="mx-3 rounded overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">ID</th>

              <th scope="col">Tên</th>

              <th scope="col" colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {accountPage.pageData.map((account: any, index: number) => {
              return (
                <tr className="align-middle">
                  <th scope="row">{index + 1}</th>
                  <td>{account.id}</td>
                  <td>{account.username}</td>

                  <td colSpan={2}>
                    <div className="d-flex justify-content-around">
                      <Link to={`/admin/accounts/update/${account.id}`}>
                        <button className="update-btn p-1 btn btn-outline-warning">
                          Sua
                        </button>
                      </Link>
                      <button
                        className="delete-btn p-1 btn btn-outline-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(account.id);
                        }}
                      >
                        xoa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {renderPagination(accountPage.totalPages, handlePagination)}
      </div>
    </div>
  );
}
