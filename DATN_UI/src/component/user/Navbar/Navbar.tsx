import { useEffect, useState } from "react";
import SubNavbar from "./SubNavbar";
import { FaCaretDown } from "react-icons/fa";
import { CategoryAPI, ProductAPI } from "../../../api";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([
    { id: "", name: "", image: "", childCategories: [], vendors: [] },
  ]);
  useEffect(() => {
    CategoryAPI.getAllGroupChild()
      .then((data) => {
        setCategories(data);
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);
  return (
    // <div className="container d-none d-lg-block">
    //   <div className="cus-navbar">
    //     <ul className="cus-navbar-list">
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Điện thoại
    //         </a>
    //         <SubNavbar />
    //       </li>
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Samsung
    //         </a>
    //         <SubNavbar />
    //       </li>
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Iphone
    //         </a>
    //       </li>
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Nghe goi
    //         </a>
    //       </li>
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Ipad
    //         </a>
    //       </li>
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Am thanh
    //         </a>
    //       </li>
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Phu kien
    //         </a>
    //       </li>
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Laptop
    //         </a>
    //       </li>
    //       <li className="cus-navbar-item">
    //         <a href="#" className="cus-navbar-link">
    //           Sua chua
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>\

    <div className={`cus-navbar d-lg-block d-none container`}>
      <ul className="cus-navbar-ls  list-type-none lv0 d-flex justify-content-start align-items-center">
        {categories.map((category) => {
          return (
            <li className="level0 py-lg-2">
              <Link
                to={`/categories/${category.id}`}
                className="position-relative d-block"
              >
                {category.name}{" "}
                <span className="icon">
                  <FaCaretDown />
                </span>
              </Link>

              <ul className="lv1 p-1 list-type-none w-100 bg-white rounded">
                {category.childCategories &&
                  category.childCategories.map((childCate1) => {
                    return (
                      <li className="level1 p-1">
                        <Link
                          to={`/categories/${childCate1.id}`}
                          className="d-block mb-2"
                        >
                          {childCate1.name}
                        </Link>
                        <ul className="lv2 list-type-none">
                          {childCate1.childCategories &&
                            childCate1.childCategories.map((childCate2) => {
                              return (
                                <li className="level2 position-relative py-1">
                                  <Link to={`/categories/${childCate2.id}`}>
                                    {childCate2.name}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    );
                  })}

                {category.vendors && category.vendors.length > 0 && (
                  <li className="level1 p-1">
                    <Link to={`/`} className="d-block mb-2">
                      Hãng
                    </Link>
                    <ul className="lv2 list-type-none">
                      {category.vendors &&
                        category.vendors.map((vendor) => {
                          return (
                            <li className="level2 position-relative py-1">
                              <Link
                                to={`/categories/${category.id}?vendorId=${vendor.id}`}
                              >
                                {vendor.name}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
