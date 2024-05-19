import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { BannerAPI, FeedbackAPI, NewsAPI, url } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney } from "../../../untils";
import { formatDate } from "date-fns";
import ConfirmForm from "../ConfirmForm";
import Notify from "../Notify/Notify";
export default function BannerView() {
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
  } | null>(null);
  const [confirm, setConfirm] = useState<{ isShow: boolean; id: string }>({
    isShow: false,
    id: "",
  });
  const [banners, setBanners] = useState<any>([]);
  const handleDeleteClick = (id: string) => {
    setConfirm((pre) => ({ isShow: true, id: id }));
  };

  const handleConfirm = (id: string) => {
    BannerAPI.deleteById(id)
      .then(() => {
        SetNotify({ value: "Xóa thành công", isSuccess: true });
      })
      .catch(() => {
        navigate("/error");
      });
    setBanners((pre: any) => pre.filter((pre: any) => pre.id !== id));
  };
  useEffect(() => {
    BannerAPI.getAll()
      .then((data) => {
        setBanners(data);
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);

  console.log(banners);
  return (
    <>
      <ConfirmForm
        confirm={confirm}
        setConfirm={setConfirm}
        handleClick={handleConfirm}
      />
      {notify && <Notify notify={notify} setNotify={SetNotify} />}
      <div className="vh-100 overflow-y-auto">
        <Navbar title="Quản lý phản hồi khách hàng" />
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
            <Link to="/admin/banners/add">
              <button className="btn btn-outline-success">Thêm</button>
            </Link>
          </div>
        </div>
        <div className="mx-3 rounded overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Banner Chính</th>
                <th scope="col">Slide Banner</th>
                <th scope="col">Hiện thị</th>
                <th scope="col" colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner: any, index: number) => {
                return (
                  <tr className="align-middle">
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className="w-100">
                        <img
                          className="w-100"
                          src={url + banner.image}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      {banner.primaryBanner ? (
                        <input type="radio" checked={true} readOnly />
                      ) : (
                        <input type="radio" checked={false} readOnly />
                      )}
                    </td>
                    <td>
                      {banner.slideBanner ? (
                        <input type="radio" checked={true} readOnly />
                      ) : (
                        <input type="radio" checked={false} readOnly />
                      )}
                    </td>
                    <td>
                      {" "}
                      <input type="checkbox" checked={banner.show} readOnly />
                    </td>

                    <td colSpan={2}>
                      <div className="d-flex justify-content-around">
                        <Link to={`/admin/banners/update/${banner.id}`}>
                          <button className="update-btn p-1 btn btn-outline-warning">
                            Sửa
                          </button>
                        </Link>
                        <button
                          className="delete-btn p-1 btn btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteClick(banner.id);
                          }}
                        >
                          xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
