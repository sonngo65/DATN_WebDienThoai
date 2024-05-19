import { useRef, useState } from "react";
import Notify from "../Notify/Notify";
import Navbar from "../Navbar";
import { handleChangeFiles } from "../../../untils";
import TextEditor from "../TextEditor";
import { FeedbackAPI } from "../../../api";
import { useNavigate } from "react-router-dom";

export default function FeedbackAdd() {
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
  } | null>(null);
  const [feedback, setFeedback] = useState<any>({
    id: "",
    nameCustomer: "",
    fieldCustomer: "",
    image: "",
    content: "",
  });
  const handleChangeFeedback = (
    name: string,
    value: string | number | boolean
  ) => {
    setFeedback((pre: any) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    FeedbackAPI.add(feedback)
      .then(() => {
        SetNotify({ value: "Thêm tin tức thành công", isSuccess: true });
        setFeedback({
          id: "",
          nameCustomer: "",
          fieldCustomer: "",
          image: "",
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
  console.log(feedback);
  return (
    <div className="overflow-y-auto vh-100 bg-white">
      {notify && <Notify notify={notify} setNotify={SetNotify} />}
      <Navbar title={"Thêm phản hồi khách hàng"} />
      <div className="base-info px-4">
        <div className="title-v1 py-3">
          <h5>Thông tin cơ bản</h5>
        </div>
        <form action="#">
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="floatingInput " className="form-label">
                Tên khách hàng
              </label>
              <input
                type="text"
                id="nameCustomer"
                value={feedback.nameCustomer}
                className="form-control"
                onChange={(e) => {
                  handleChangeFeedback(
                    e.currentTarget.id,
                    e.currentTarget.value
                  );
                }}
                placeholder=""
              />
            </div>
            <div className="col-6">
              <label htmlFor="floatingInput " className="form-label">
                Nghề nghiệp
              </label>
              <input
                type="text"
                id="fieldCustomer"
                value={feedback.fieldCustomer}
                className="form-control"
                onChange={(e) => {
                  handleChangeFeedback(
                    e.currentTarget.id,
                    e.currentTarget.value
                  );
                }}
                placeholder=""
              />
            </div>
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
                  handleChangeFiles(e, (file) => {
                    setFeedback((pre: any) => ({ ...pre, image: file }));
                  });
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="floatingInput " className="form-label">
              Đánh giá
            </label>
            <textarea
              id="content"
              cols={30}
              rows={10}
              value={feedback.content}
              className="form-control"
              onChange={(e) =>
                handleChangeFeedback(e.currentTarget.id, e.currentTarget.value)
              }
            ></textarea>
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
