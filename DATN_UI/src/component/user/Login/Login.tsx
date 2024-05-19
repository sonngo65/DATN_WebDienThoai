import { useEffect, useState } from "react";
import Overlay from "../../Overlay/Overlay";
import { IoMdClose } from "react-icons/io";
import { AccountAPI, url } from "../../../api";
import { useDispatch } from "react-redux";
import * as actionType from "../../../store/actionTypes";
import { JsxEmit } from "typescript";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Signup from "../Signup";
interface LoginProps {
  className: string;
  onClick?: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<any>;
}
export default function Login({
  className,
  onClick,
  isOpen,
  setIsOpen,
}: LoginProps) {
  // const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const isNotLogin = useSelector((state: any) => state.isNotLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountRequest, setAccountRequest] = useState<Account>({
    username: "",
    password: "",
  });
  const handleClickLogin = () => {
    setIsOpen((pre: any) => {
      return pre.map((popup: any) => {
        if (popup.name === "LOGIN") return { ...popup, isOpen: true };
        return { ...popup, isOpen: false };
      });
    });
  };
  const handleClickClose = () => {
    if (isNotLogin === true) dispatch({ type: actionType.NOT_LOGIN });

    setIsOpen((pre: any) => {
      return pre.map((popup: any) => {
        // if (popup.name === "LOGIN") return { ...popup, isOpen: true };
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
    if (accountRequest.password === "" || accountRequest.username === "") {
      setIsError("Hãy điền đầy đủ không được bỏ trống !");
      return;
    }

    AccountAPI.signIn(accountRequest)
      .then((data) => {
        setIsOpen(false);
        sessionStorage.setItem("account", JSON.stringify(data.account));
        sessionStorage.setItem("token", data.account.token);

        sessionStorage.setItem("carts", JSON.stringify(data.carts));
        dispatch({ type: actionType.LOGIN, payload: data });
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  useEffect(() => {
    setIsOpen((pre: any) => {
      return pre.map((popup: any) => {
        if (popup.name === "LOGIN") return { ...popup, isOpen: isNotLogin };
        return { ...popup, isOpen: false };
      });
    });
  }, [isNotLogin]);
  console.log(isNotLogin);
  return (
    <>
      <a
        href="#"
        className={className}
        onClick={() => {
          // if (onClick) onClick();
          handleClickLogin();
        }}
      >
        Đăng nhập
      </a>
      <div className={`popup-s position-fixed ${isOpen ? "open" : ""} `}>
        <div className="popup-head">
          <div className="logo">
            <img src={url + "logo5.png"} alt="error" />
          </div>
          <div className="title">
            <h5>Đăng nhập</h5>
          </div>
          <div className="close" onClick={handleClickClose}>
            <IoMdClose />
          </div>
        </div>
        <div className="popup-body">
          <form
            action="#"
            className=" popup-form px-4 py-2"
            onSubmit={handleSubmit}
          >
            <div className="mb-2 form-floating">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder=""
                onChange={handleChange}
              />
              <label htmlFor="">Nhập tài khoản</label>
            </div>
            <div className="mb-2 form-floating">
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={handleChange}
                placeholder=""
              />
              <label htmlFor="">Nhập mật khẩu</label>
            </div>
            <div className="fg-pw text-end mt-1">
              <a href="#">Bạn quên mật khẩu rồi ?</a>
            </div>
            <button type="submit" className="w-100 px-2 py-3 text-center mt-4">
              Đăng nhập
            </button>
          </form>
          <p>
            Bạn không có tài khoản ?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen((pre: any) => {
                  return pre.map((popup: any) => {
                    if (popup.name === "SIGNUP")
                      return { ...popup, isOpen: true };
                    return { ...popup, isOpen: false };
                  });
                });
              }}
              className="text-deco-none"
            >
              Đăng ký
            </a>
            {/* z */}
          </p>

          {/* <p className="mt-4">Hoặc đăng nhập với</p>
          <div className="social-popup">
            <a href="#">
              <img src="facebook.png" alt="error" />
              <span className="d-inline-block ms-2">Facebook</span>
            </a>
            <a href="#" className="ms-2">
              <img src="login-google.png" alt="error" />
              <span className="d-inline-block ms-2">Google</span>
            </a>
          </div> */}
        </div>
      </div>
      <Overlay
        isOpen={isOpen}
        handleOpen={() => {
          // dispatch({ type: actionType.NOT_LOGIN });
          console.log("wqewe");
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
