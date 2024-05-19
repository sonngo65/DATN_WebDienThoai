import { set } from "date-fns";
import Overlay from "../../Overlay/Overlay";

export default function ConfirmForm({
  confirm,
  setConfirm,
  handleClick,
}: {
  confirm: { isShow: boolean; id: string };
  setConfirm: React.Dispatch<
    React.SetStateAction<{
      isShow: boolean;
      id: string;
    }>
  >;
  handleClick: (id: string) => void;
}) {
  return (
    <>
      <div
        className={`confirm-form position-fixed top-50 start-50 translate-middle bg-white rounded p-3 ${
          confirm.isShow ? "d-block" : "d-none"
        } `}
      >
        <h5 className="text-center mb-3">Bạn có chắc chắn muốn xóa !</h5>
        <div className="row">
          <div className="col-6 text-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleClick(confirm.id);
                setConfirm((pre) => ({ id: "", isShow: false }));
              }}
            >
              Xóa
            </button>
          </div>
          <div className="col-6  text-center">
            <button
              className="btn btn-danger"
              onClick={() => {
                setConfirm((pre) => ({ id: "", isShow: false }));
              }}
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
      <Overlay
        isOpen={confirm.isShow}
        handleOpen={() => {
          setConfirm((pre) => ({ ...pre, isShow: !pre.isShow }));
        }}
      />
    </>
  );
}
