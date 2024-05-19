import { Outlet, useNavigate } from "react-router-dom";
import CategoryAdd from "../Category/CategoryAdd";
import Dashboard from "../Dashboard";
import Navbar from "../Navbar";
import { ProductAdd, ProductView } from "../Product";
import SideBar from "../SideBar";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useLayoutEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     JSON.parse(sessionStorage.getItem("account") as any).role[0].authority !==
  //     "ROLE_ADMIN"
  //   ) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <>
      {/* {JSON.parse(sessionStorage.getItem("account") as any).role[0]
        .authority === "ROLE_ADMIN" && ( */}
      <div className="w-100 overflow-hidden">
        <div className="d-flex">
          <SideBar />
          <div className="w-100 ">
            <Outlet />
            {/* <Navbar title="Dashboard" /> */}
            {/* <ProductUpdate /> */}
            {/* <ProductView /> */}
            {/* <Dashboard /> */}
            {/* <CategoryAdd /> */}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}
