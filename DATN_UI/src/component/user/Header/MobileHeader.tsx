import { HiOutlineHome } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { LuPhoneCall } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import MobileNavbar from "../Navbar/MobileNavbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../../store/actionTypes";
import Login from "../Login";
import Signup from "../Signup";

export default function MobileHeader({
  carts,
  account,
}: {
  carts: any;
  account: any;
}) {
  const dispatch = useDispatch();
  const [isOpenNav, setIsOpenNav] = useState(false);
  const handleOpenNavClick = () => {
    setIsOpenNav((pre) => !pre);
  };
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [popup, setPopup] = useState<any>([
    {
      name: "LOGIN",
      isOpen: false,
    },
    {
      name: "SIGNUP",
      isOpen: false,
    },
  ]);
  console.log(popup);
  return (
    <div className="mobi-header d-lg-none d-flex position-fixed justify-content-around align-items-center">
      <Link
        to="/"
        className="mobi-header-item d-flex align-items-center flex-column h-100 justify-content-center"
      >
        <HiOutlineHome />
        <span>Trang chủ</span>
      </Link>
      <a
        className="mobi-header-item d-flex align-items-center flex-column h-100 justify-content-center"
        onClick={handleOpenNavClick}
      >
        <BiCategory />
        <span>Danh mục</span>
      </a>
      <a href="#" className="mobi-header-item  position-relative">
        <div
          className={`drop-up rounded bg-white position-absolute bottom-100   shadow-sm p-1 ${
            isOpenAccount ? "visible" : "invisible"
          }`}
          onClick={() => {
            setIsOpenAccount(false);
          }}
        >
          {account ? (
            <>
              <Link
                to={`/order`}
                className="  text-deco-none text-nowrap p-1 d-block"
              >
                Lịch sử đặt hàng
              </Link>
              <Link
                className=" text-deco-none text-nowrap  p-1 d-block"
                to=""
                onClick={(e) => {
                  e.preventDefault();
                  sessionStorage.clear();
                  dispatch({ type: actionType.LOGIN, payload: null });
                }}
              >
                Đăng xuất
              </Link>
            </>
          ) : (
            <>
              <Login
                className="header__link d-block text-deco-none"
                isOpen={popup[0].isOpen}
                setIsOpen={setPopup}
              />
              <Signup
                className="header__link d-block text-deco-none"
                isOpen={popup[1].isOpen}
                setIsOpen={setPopup}
              />
            </>
          )}
        </div>
        <span
          onClick={(e) => {
            setIsOpenAccount(true);
          }}
          className=" d-flex align-items-center flex-column h-100 justify-content-center"
        >
          <FaRegUser />
          <span>Tài khoản</span>
        </span>
      </a>
      <a
        href="#"
        className="mobi-header-item  d-flex align-items-center flex-column h-100 justify-content-center"
      >
        <LuPhoneCall />
        <span>Liên hệ</span>
      </a>
      <Link
        to="/cart"
        className="mobi-header-item  d-flex align-items-center flex-column h-100 justify-content-center "
      >
        <span className="position-relative">
          <BsCart4 />
          <span className="position-absolute top-0 start-100 translate-middle-y badge rounded-pill bg-danger">
            {carts.length}
          </span>
        </span>
        <span>Giỏ hàng </span>
      </Link>
      <MobileNavbar isOpen={isOpenNav} setIsOpen={setIsOpenNav} />
    </div>
  );
}
