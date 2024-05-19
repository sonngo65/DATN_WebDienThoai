import { useEffect, useRef, useState } from "react";
import Notify from "../Notify/Notify";
import Navbar from "../Navbar";
import { handleChangeFiles } from "../../../untils";
import TextEditor from "../TextEditor";
import { BannerAPI, url } from "../../../api";
import SlideBanner from "../../user/SlideBanner";
import { useNavigate, useParams } from "react-router-dom";

export default function BannerAdd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
    handleNavigate?: () => void;
  } | null>(null);
  const [banner, setBanner] = useState<any>({
    id: "",
    primaryBanner: false,
    slideBanner: false,
    image: "",
    show: false,
  });
  const [radio, setRadio] = useState<any>("");
  const handleChangeBanner = (
    name: string,
    value: string | number | boolean
  ) => {
    setBanner((pre: any) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (id)
      BannerAPI.updateById(id, banner)
        .then(() => {
          SetNotify({
            value: "Thêm tin tức thành công",
            isSuccess: true,
            handleNavigate: () => navigate("/admin/banners"),
          });
          setBanner({
            id: "",
            primaryBanner: false,
            slideBanner: false,
            image: "",
            show: false,
          });
          setFileKey(resetFileInput());
        })
        .catch(() => {
          navigate("/error");
        });
  };
  const resetFileInput = () => Math.random().toString(36);
  const [fileKey, setFileKey] = useState<string>("");

  useEffect(() => {
    if (id)
      BannerAPI.getById(id).then((data) => {
        setBanner(data);
        if (data.primaryBanner) setRadio("option1");
        if (data.slideBanner) setRadio("option2");
      });
  }, []);
  useEffect(() => {
    if (radio === "option1") {
      setBanner((pre: any) => ({
        ...pre,
        primaryBanner: true,
        slideBanner: false,
      }));
    } else {
      setBanner((pre: any) => ({
        ...pre,
        primaryBanner: false,
        slideBanner: true,
      }));
    }
  }, [radio]);
  console.log(banner);
  return (
    <div className="overflow-y-auto vh-100 bg-white">
      {notify && <Notify notify={notify} setNotify={SetNotify} />}
      <Navbar title={"Thêm phản hồi khách hàng"} />
      <div className="base-info px-4">
        <div className="title-v1 py-3">
          <h5>Thông tin cơ bản</h5>
        </div>
        <form action="#">
          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Ảnh
              </label>
              <input
                type="file"
                className="form-control"
                key={fileKey}
                onChange={(e) => {
                  handleChangeFiles(e, (file) => {
                    setBanner((pre: any) => ({ ...pre, image: file }));
                  });
                }}
              />
              <div className="preview">
                <img src={url + banner.image} alt="" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <div className="form-check">
                <label htmlFor="floatingInput " className="form-check-label">
                  Banner Chính
                </label>
                <input
                  type="radio"
                  id="primaryBanner"
                  name="radio"
                  value="option1"
                  checked={radio === "option1"}
                  className="form-check-input"
                  onChange={(e) => {
                    setRadio(e.target.value);
                  }}
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-check">
                <label htmlFor="floatingInput " className="form-check-label">
                  Slide Banner
                </label>
                <input
                  type="radio"
                  id="slideBanner"
                  name="radio"
                  value="option2"
                  checked={radio === "option2"}
                  className="form-check-input"
                  onChange={(e) => {
                    setRadio(e.target.value);
                  }}
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-check">
                <label htmlFor="floatingInput " className="form-check-label">
                  Hiện thị
                </label>
                <input
                  type="checkbox"
                  id="show"
                  checked={banner.show}
                  className="form-check-input"
                  onChange={(e) => {
                    handleChangeBanner(
                      e.currentTarget.id,
                      e.currentTarget.checked
                    );
                  }}
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="text-end my-5">
        <button
          type="submit"
          className="btn btn-outline-primary px-5"
          onClick={handleAdd}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
