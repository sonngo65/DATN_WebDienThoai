import { ChangeEvent, FormEvent, useState } from "react";
import Overlay from "../../Overlay/Overlay";
import { IoMdClose } from "react-icons/io";
import { MdSmartphone } from "react-icons/md";
import { error } from "console";
import { AccountAPI, url } from "../../../api";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
interface SignupProps {
  className: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<any>;
}
type AccountRequest = Account & {
  rePassword: string;
};
export default function Signup({ className, isOpen, setIsOpen }: SignupProps) {
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [accountRequest, setAccountRequest] = useState<AccountRequest>({
    username: "",
    password: "",
    rePassword: "",
  });
  const handleClickSignup = () => {
    setIsOpen((pre: any) => {
      return pre.map((popup: any) => {
        if (popup.name === "SIGNUP") return { ...popup, isOpen: true };
        return { ...popup, isOpen: false };
      });
    });
  };
  const handleClickClose = () => {
    setIsOpen((pre: any) => {
      return pre.map((popup: any) => {
        return { ...popup, isOpen: false };
      });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    setAccountRequest((pre) => ({ ...pre, [name]: value }));
    setIsError(null);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      accountRequest.password === "" ||
      accountRequest.username === "" ||
      accountRequest.rePassword === ""
    ) {
      setIsError("Hãy điền đầy đủ không được bỏ trống !");
      return;
    }
    if (accountRequest.username.length < 6) {
      setIsError("Tên tài khoản phải có ít nhất 6 kí tự !");
      return;
    }
    if (accountRequest.password.length < 6) {
      setIsError("Mật khẩu phải có ít nhất 6 kí tự !");
      return;
    }
    if (accountRequest.password !== accountRequest.rePassword) {
      setIsError("Mật khẩu không trùng khớp với nhau !");
      return;
    }

    AccountAPI.signUp(accountRequest)
      .then(() => setIsOpen(false))
      .catch(() => {
        navigate("/error");
      });
  };
  // ******************************************************
  return (
    <>
      <a
        href="#"
        className={className}
        onClick={() => {
          handleClickSignup();
        }}
      >
        Đăng ký
      </a>
      <div className={`popup-s position-fixed ${isOpen ? "open" : ""} `}>
        <div className="popup-head">
          <div className="logo">
            <img src={url + "logo5.png"} alt="error" />
          </div>
          <div className="title">
            <h5>Đăng ký </h5>
          </div>
          <div className="close" onClick={handleClickClose}>
            <IoMdClose />
          </div>
        </div>
        <div className="popup-body">
          <form className=" popup-form px-4 py-2" onSubmit={handleSubmit}>
            <div className="form-floating mb-2">
              <input
                required
                type="text"
                className="form-control"
                placeholder=""
                id="username"
                onChange={handleChange}
              />
              <label htmlFor="" className="">
                Nhập tài khoản
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                required
                className="form-control"
                type="password"
                id="password"
                onChange={handleChange}
                placeholder=""
              />
              <label htmlFor="" className="">
                Nhập mật khẩu
              </label>
            </div>
            <div className="form-floating mb-2">
              <input
                required
                type="password"
                className="form-control"
                id="rePassword"
                onChange={handleChange}
                placeholder=""
              />
              <label htmlFor="" className="">
                Nhập lại mật khẩu
              </label>
            </div>
            {isError && <div className="alert alert-danger">{isError}</div>}
            <button type="submit" className="w-100 px-2 py-3 text-center mt-4">
              <span className="icon">
                <MdSmartphone />
              </span>
              Đăng ký
              {/* <Login
                className="text-deco-none"
                onClick={() => {
                  setIsOpen((pre) => !pre);
                }}
              /> */}
            </button>
          </form>
          <p>
            Bạn đã có tài khoản ?
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen((pre: any) => {
                  return pre.map((popup: any) => {
                    if (popup.name === "LOGIN")
                      return { ...popup, isOpen: true };
                    return { ...popup, isOpen: false };
                  });
                });
              }}
              className="text-deco-none"
            >
              Đăng nhập
            </a>
          </p>

          {/* <p className="mt-4">hoặc signup với</p>
          <div className="social-popup">
            <a href="#">
              <img src="facebook.png" alt="error" />
              <span className="d-inline-block ms-2">Facebook</span>
            </a>
            <a href="#" className="ms-2">
              <img src="./login-google.png" alt="error" />
              <span className="d-inline-block ms-2">Google</span>
            </a>
          </div> */}
        </div>
        <div id="sign-in-button"></div>
      </div>
      <Overlay
        isOpen={isOpen}
        handleOpen={() => {
          console.log("AAAA");

          setIsOpen((pre: any) => {
            return pre.map((popup: any) => {
              // if (popup.name === "LOGIN") return { ...popup, isOpen: false };
              return { ...popup, isOpen: false };
            });
          });
        }}
      />
    </>
  );
}
