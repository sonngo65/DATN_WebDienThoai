import { useRef, useState } from "react";
import Notify from "../Notify/Notify";
import Navbar from "../Navbar";
import { handleChangeFiles } from "../../../untils";
import TextEditor from "../TextEditor";
import { NewsAPI } from "../../../api";
import { useNavigate } from "react-router-dom";

export default function NewsAdd() {
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
  } | null>(null);
  const [preViews, setPreViews] = useState<any>(null);
  const [news, setNews] = useState<News>({
    id: "",
    title: "",
    createdTime: null,
    image: "",
    summary: "",
    content: "",
  });
  const handleChangeNews = (name: string, value: string | number | boolean) => {
    setNews((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    NewsAPI.add(news)
      .then(() => {
        SetNotify({ value: "Thêm tin tức thành công", isSuccess: true });
        setNews({
          id: "",
          title: "",
          createdTime: null,
          image: "",
          summary: "",
          content: "",
        });
        setFileKey(resetFileInput());
      })
      .catch(() => {
        navigate("/error");
      });
  };
  const resetFileInput = () => Math.random().toString(36);
  const [fileKey, setFileKey] = useState<string>("");
  console.log(news);
  console.log(preViews);
  return (
    <div className="overflow-y-auto vh-100 bg-white">
      {notify && <Notify notify={notify} setNotify={SetNotify} />}
      <Navbar title={"Thêm tin tức"} />
      <div className="base-info px-4">
        <div className="title-v1 py-3">
          <h5>Thông tin cơ bản</h5>
        </div>
        <form action="#">
          <div className=" mb-3">
            <label htmlFor="floatingInput " className="form-label">
              Tiêu đề tin tức
            </label>
            <input
              type="text"
              id="title"
              value={news.title}
              className="form-control"
              onChange={(e) => {
                handleChangeNews(e.currentTarget.id, e.currentTarget.value);
              }}
              placeholder=""
            />
          </div>

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
                  handleChangeFiles(
                    e,
                    (fileName) => {
                      setNews((pre) => ({ ...pre, image: fileName }));
                    },
                    (file) => {
                      setNews((pre) => ({
                        ...pre,
                        imagePreview: URL.createObjectURL(file),
                      }));
                    }
                  );
                }}
              />
              <div className="preview my-3">
                {news.imagePreview && <img src={news.imagePreview} alt="" />}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="floatingInput " className="form-label">
              Tóm tắt
            </label>
            <textarea
              id="summary"
              cols={30}
              rows={10}
              value={news.summary}
              className="form-control"
              onChange={(e) =>
                handleChangeNews(e.currentTarget.id, e.currentTarget.value)
              }
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="floatingInput " className="form-label">
              Mô tả
            </label>
            <TextEditor
              value={news.content}
              id="content"
              onChange={handleChangeNews}
            />
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
