import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { NewsAPI } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney, renderPagination } from "../../../untils";
import { formatDate } from "date-fns";
import ConfirmForm from "../ConfirmForm";
import Notify from "../Notify/Notify";
export default function NewsView() {
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
  } | null>(null);
  const [confirm, setConfirm] = useState<{ isShow: boolean; id: string }>({
    isShow: false,
    id: "",
  });
  const [newsPage, setNewsPage] = useState<any>({
    pageData: [],
    currentPageNo: 0,
    totalPages: 0,
  });
  const handlePagination = (pageNo: number) => {
    NewsAPI.getAll(pageNo.toString())
      .then((data) => {
        setNewsPage({ ...data, currentPageNo: pageNo });
      })
      .catch(() => {
        navigate("/error");
      });
  };
  useEffect(() => {
    NewsAPI.getAll()
      .then((data) => {
        setNewsPage({ ...data, currentPageNo: 0 });
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);
  const handleConfirm = (id: string) => {
    NewsAPI.deleteById(id)
      .then(() => {
        SetNotify({ value: "Xóa thành công", isSuccess: true });
        if (newsPage.pageData.length <= 1) {
          NewsAPI.getAll((newsPage.currentPageNo - 1).toString()).then(
            (data) => {
              setNewsPage({
                ...data,
                currentPageNo: newsPage.currentPageNo - 1,
              });
            }
          );
          return;
        }
        NewsAPI.getAll(newsPage.currentPageNo.toString()).then((data) => {
          setNewsPage({
            ...data,
            currentPageNo: newsPage.currentPageNo.toString(),
          });
        });
      })
      .catch(() => {
        navigate("/error");
      });
  };

  const handleDeleteClick = (id: string) => {
    setConfirm((pre) => ({ isShow: true, id: id }));
  };

  return (
    <>
      <ConfirmForm
        confirm={confirm}
        setConfirm={setConfirm}
        handleClick={handleConfirm}
      />
      {notify && <Notify notify={notify} setNotify={SetNotify} />}

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
            <Link to="/admin/news/add">
              <button className="btn btn-outline-success">Thêm</button>
            </Link>
          </div>
        </div>
        <div className="mx-3 rounded overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Thời gian đăng</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Tóm tắt</th>\<th scope="col" colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {newsPage.pageData.map((news: any, index: number) => {
                return (
                  <tr className="align-middle">
                    <th scope="row">{index + 1}</th>
                    <td>{news.title}</td>
                    <td>{formatDate(news.createdTime, "dd/MM/yyyy HH:mm")}</td>
                    <td>
                      <div className="w-100">
                        <img className="w-100" src={news.image} alt="" />
                      </div>
                    </td>
                    <td>{news.summary}</td>

                    <td colSpan={2}>
                      <div className="d-flex justify-content-around">
                        <Link to={`/admin/news/update/${news.id}`}>
                          <button className="update-btn p-1 btn btn-outline-warning">
                            Sua
                          </button>
                        </Link>
                        <button
                          className="delete-btn p-1 btn btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteClick(news.id);
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
          {renderPagination(newsPage.totalPages, handlePagination)}
        </div>
      </div>
    </>
  );
}
