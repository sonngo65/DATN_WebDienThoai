import Navbar from "../Navbar";
import { CiSearch, CiHome } from "react-icons/ci";
import { LuPhoneCall } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import MobileHeader from "./MobileHeader";
import Login from "../Login";
import Signup from "../Signup";
import FixScreen from "./FixScreen";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../../../api";
import { formatMoney } from "../../../untils";
import SearchBox from "./SearchBox";
import { useDispatch } from "react-redux";
import * as actionType from "../../../store/actionTypes";
export default function Header() {
  const rootState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [account, setAccount] = useState<any>("");
  const [carts, setCarts] = useState<any>([]);
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

  useEffect(() => {
    if (!sessionStorage.getItem("account")) {
      setAccount("");
      setCarts([]);
      return;
    }
    setAccount(JSON.parse(sessionStorage.getItem("account") as any));
    setCarts(
      JSON.parse(sessionStorage.getItem("carts") as any)
        ? JSON.parse(sessionStorage.getItem("carts") as any)
        : []
    );
  }, [rootState]);
  console.log(popup);
  return (
    <>
      <div className="header container-fluid">
        <div className="header__head container d-none d-lg-block">
          <div className="row pt-3">
            <div className="col-lg-4 col-md-12 d-flex align-items-center">
              <div className="header__logo">
                <Link to="/">
                  <img src={url + "logo5.png"} alt="" />
                </Link>
              </div>
              <SearchBox />
            </div>
            <div className="col-lg-8">
              <ul className="header__list list-type-none ">
                <li className="header__item list-item-center d-flex my-auto">
                  <Link to="/news" className="header__link">
                    Công nghệ 24h
                  </Link>
                  <span>|</span>
                  <Link to="/product/search" className="header__link">
                    Khuyến mãi mới
                  </Link>
                </li>
                <li className="header__item">
                  <a href="#" className="header__link list-item-center">
                    <div className="icon-ring">
                      <LuPhoneCall />
                    </div>
                    <span className="text-start fw-bold">
                      {" "}
                      Tư vấn: 0879896115
                    </span>
                  </a>
                </li>
                <li className="header__item ">
                  <Link
                    to="/cart"
                    className="header__link bg-round-white list-item-center position-relative"
                  >
                    <BsCart4 />
                    <span>Giỏ hàng</span>
                    <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
                      {carts.length}
                    </span>
                  </Link>
                </li>
                <li className="header__item list-item-center">
                  <FaRegUserCircle />
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    {account ? (
                      <>
                        {" "}
                        <span>{account.username}</span>
                        <Link
                          to={`/order`}
                          className="text-dark text-deco-none"
                        >
                          Lịch sử đặt hàng
                        </Link>
                        {account.role[0].authority === "ROLE_ADMIN" && (
                          <Link
                            className="text-dark text-deco-none"
                            to="/admin"
                          >
                            Trang quản trị
                          </Link>
                        )}
                        <Link
                          className="text-dark text-deco-none"
                          to=""
                          onClick={(e) => {
                            e.preventDefault();
                            sessionStorage.clear();
                            dispatch({ type: actionType.LOGIN, payload: null });
                            navigate("/");
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

                    {/* <a href="#" className="header__link d-block text-deco-none">
                    Dang ky
                  </a>
                  <a href="#" className="header__link d-block text-deco-none">
                    Dang nhap
                  </a> */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header__mobi-head position-fixed d-lg-none">
          <div className="row">
            <div className="d-flex align-items-center justify-content-center px-5">
              <div className="header__logo">
                <Link to="/">
                  <img src={url + "logo5.png"} alt="" />
                </Link>
              </div>
              <SearchBox className="w-100" />
              {/* <div className="search-box w-100">
              <input
                className="search-box__input"
                type="text"
                placeholder="Tu khoa ..."
              />
              <CiSearch />
            </div> */}
            </div>
          </div>
        </div>

        <Navbar />
        <MobileHeader account={account} carts={carts} />
        <FixScreen />
      </div>
      {(rootState as any).breadcumb.length > 0 && (
        <div className="breadcumb mt-5 pt-4 mt-lg-0 pt-lg-2 py-2 bg-white  shadow-sm">
          <div className="container pt-1 pt-lg-0">
            <ul className="breadcumb-lt list-type-none">
              {(rootState as any).breadcumb.map((item: any, index: number) => {
                return (
                  <>
                    <li className="breadcumb-it d-inline-block mx-2">
                      {index === 0 && <CiHome className="mb-1" />}
                      {item.url ? (
                        <Link className={`ps-1`} to={item.url}>
                          {item.name}
                        </Link>
                      ) : (
                        <p className="m-0 ps-1"> {item.name}</p>
                      )}
                    </li>
                    {index < (rootState as any).breadcumb.length - 1 && (
                      <span>/</span>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
