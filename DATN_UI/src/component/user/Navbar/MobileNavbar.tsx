import { useEffect, useState } from "react";
import Overlay from "../../Overlay/Overlay";
import { CategoryAPI } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
interface MobileNavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MobileNavbar({ isOpen, setIsOpen }: MobileNavbarProps) {
  const navigate = useNavigate();
  // const [categories, setCategories] = useState([
  //   {
  //     id: 1,
  //     name: "dien thoai",
  //     childCate1: [
  //       {
  //         name: "dien thoai iphone",
  //         childCate2: [
  //           { name: "iphone x1" },
  //           { name: "iphone x2" },
  //           { name: "iphone x3" },
  //           { name: "iphone x4" },
  //         ],
  //       },
  //       {
  //         name: "dien thoai samsung",
  //         childCate2: [
  //           { name: "samsung x1" },
  //           { name: "samsung x2" },
  //           { name: "samsung x3" },
  //           { name: "samsung x4" },
  //         ],
  //       },
  //     ],
  //     isOpen: false,
  //   },
  //   {
  //     id: 2,
  //     name: "dien thoai",
  //     childCate1: [
  //       {
  //         name: "dien thoai iphone",
  //         childCate2: [
  //           { name: "iphone x1" },
  //           { name: "iphone x2" },
  //           { name: "iphone x3" },
  //         ],
  //       },
  //     ],
  //     isOpen: true,
  //   },
  //   {
  //     id: 3,
  //     name: "dien thoai",
  //     childCate1: [
  //       {
  //         name: "dien thoai iphone",
  //         childCate2: [
  //           { name: "iphone x1" },
  //           { name: "iphone x2" },
  //           { name: "iphone x3" },
  //         ],
  //       },
  //     ],
  //     isOpen: false,
  //   },
  //   {
  //     id: 4,
  //     name: "dien thoai",
  //     childCate1: [
  //       {
  //         name: "dien thoai iphone",
  //         childCate2: [
  //           { name: "iphone x1" },
  //           { name: "iphone x2" },
  //           { name: "iphone x3" },
  //         ],
  //       },
  //     ],
  //     isOpen: false,
  //   },
  //   {
  //     id: 5,
  //     name: "dien thoai",
  //     childCate1: [
  //       {
  //         name: "dien thoai iphone",
  //         childCate2: [
  //           { name: "iphone x1" },
  //           { name: "iphone x2" },
  //           { name: "iphone x3" },
  //         ],
  //       },
  //     ],
  //     isOpen: false,
  //   },
  //   {
  //     id: 6,
  //     name: "dien thoai",
  //     childCate1: [
  //       {
  //         name: "dien thoai iphone",
  //         childCate2: [
  //           { name: "iphone x1" },
  //           { name: "iphone x2" },
  //           { name: "iphone x3" },
  //         ],
  //       },
  //     ],
  //     isOpen: false,
  //   },
  //   {
  //     id: 7,
  //     name: "dien thoai",
  //     childCate1: [
  //       {
  //         name: "dien thoai iphone",
  //         childCate2: [
  //           { name: "iphone x1" },
  //           { name: "iphone x2" },
  //           { name: "iphone x3" },
  //         ],
  //       },
  //     ],
  //     isOpen: false,
  //   },
  //   {
  //     id: 8,
  //     name: "dien thoai",
  //     childCate1: [
  //       {
  //         name: "dien thoai iphone",
  //         childCate2: [
  //           { name: "iphone x1" },
  //           { name: "iphone x2" },
  //           { name: "iphone x3" },
  //         ],
  //       },
  //     ],
  //     isOpen: false,
  //   },
  // ]);
  const [categories, setCategories] = useState<any[]>([
    { id: "", name: "", image: "", childCategories: [], vendors: [] },
  ]);

  useEffect(() => {
    CategoryAPI.getAllGroupChild()
      .then((data) => {
        setCategories(
          data.map((preData: any, index: number) =>
            index === 0
              ? { ...preData, isOpen: true }
              : { ...preData, isOpen: false }
          )
        );
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);
  const handleClick = (id: string) => {
    // setIsOpen((pre) => !!pre);
    setCategories((pre) => {
      return pre.map((category) => {
        return category.id === id
          ? { ...category, isOpen: true }
          : { ...category, isOpen: false };
      });
    });
  };
  return (
    <>
      <div className={`mobi-navbar position-fixed ${isOpen ? "open" : ""}`}>
        <div className="mobi-menu position-relative h-100">
          <ul className="mobi-navbar-ls list-type-none lv0">
            {categories.map((category) => {
              return (
                <li
                  onClick={() => {
                    handleClick(category.id as string);
                  }}
                  className={`level0 ${category.isOpen ? "open" : ""}`}
                >
                  <a className="d-flex justify-content-center align-items-center">
                    {category.name}
                  </a>
                  <ul className="lv1 list-type-none ">
                    <h5 className="text-center p-2 m-0">
                      <Link
                        className="text-deco-none cus-primary-color fw-bold"
                        to={`/categories/${category.id}`}
                      >
                        Bấm xem danh mục chính
                      </Link>
                    </h5>
                    {category.childCategories.map((childCate1: any) => {
                      return (
                        <li className="level1">
                          <Link
                            onClick={() => {
                              setIsOpen((pre) => !pre);
                            }}
                            to={`/categories/${childCate1.id}`}
                          >
                            {childCate1.name}
                          </Link>
                          <ul className="lv2 list-type-none">
                            {childCate1.childCategories.map(
                              (childCate2: any) => {
                                return (
                                  <li className="level2 position-relative">
                                    <Link
                                      onClick={() => {
                                        setIsOpen((pre) => !pre);
                                      }}
                                      to={`/categories/${childCate2.id}`}
                                    >
                                      {childCate2.name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </li>
                      );
                    })}
                    {category.vendors && category.vendors.length > 0 && (
                      <li className="level1">
                        <a>Hãng</a>
                        <ul className="lv2 list-type-none">
                          {category.vendors.map((vendor: any) => {
                            return (
                              <li className="level2 position-relative">
                                <Link
                                  onClick={() => {
                                    setIsOpen((pre) => !pre);
                                  }}
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
      </div>
      <Overlay isOpen={isOpen} handleOpen={() => setIsOpen((pre) => !pre)} />
    </>
  );
}
