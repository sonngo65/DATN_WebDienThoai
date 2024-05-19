import {
  MdKeyboardArrowDown,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import CategoryOuter from "../Product/CategoryOuter";
import CategoryHead from "../Product/component/CategoryHead";
import ProductSliderList from "../Product/component/ProductSliderList";
import ProductList from "../Product/component/ProductList";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { SliderLeftBtn, SliderRightBtn } from "../Product/component/SliderBtn";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { CategoryAPI, ProductAPI } from "../../../api";
import { useDispatch } from "react-redux";
import { GrPowerReset } from "react-icons/gr";
import * as ActionType from "../../../store/actionTypes";

const CategorySliderProduct = CategoryOuter({
  Head: CategoryHead,
  Body: ProductSliderList,
});
const CategoryProduct = CategoryOuter({
  Head: CategoryHead,
  Body: ProductList,
});
export default function ProductSearch() {
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const vendorId = searchParams.get("vendorId") || "";

  const [isShowMore, setIsShowMore] = useState(false);
  const [page, setPage] = useState({
    vendorId: "",
    priceStart: "",
    priceEnd: "",
    currentPage: 0,
    totalPages: 0,
    pageSize: 4,
    sortBy: "id",
  });
  const [productsInCategory, setProductsInCategory] = useState<any>({
    img: "",
    vendors: [],
  });
  const [allProducts, setAllProducts] = useState<any>({
    title: "Tất cả sản phẩm",
    products: [],
  });

  const [priceFilters, setPriceFilter] = useState<any>([
    {
      priceStart: "",
      priceEnd: "100000",
      name: "Dưới 100.000",
      isSelected: false,
    },
    {
      priceStart: "100000",
      priceEnd: "500000",
      name: "100.000 - 500.000",
      isSelected: false,
    },
    {
      priceStart: "2000000",
      priceEnd: "5000000",
      name: "2.000.000 - 5.000.000",
      isSelected: false,
    },
    {
      priceStart: "5000000",
      priceEnd: "7000000",
      name: "5.000.000 - 7.000.000",
      isSelected: false,
    },
    {
      priceStart: "7000000",
      priceEnd: "10000000",
      name: "7.000.000 - 10.000.000",
      isSelected: false,
    },
    {
      priceStart: "10000000",
      priceEnd: "20000000",
      name: "10.000.000 - 20.000.000",
      isSelected: false,
    },
    {
      priceStart: "20000000",
      priceEnd: "30000000",
      name: "20.000.000 - 30.000.000",
      isSelected: false,
    },
    {
      priceStart: "30000000",
      priceEnd: "",
      name: "Trên 30.000.000",
      isSelected: false,
    },
  ]);
  const [vendorFilters, setVendorFilters] = useState<any>([]);
  const [sortFilters, setSortFilters] = useState<any>([
    {
      id: "price",
      name: "Giá thấp đến cao",
      isSelected: false,
    },
    {
      id: "price:desc",
      name: "Giá cao đến thấp",
      isSelected: false,
    },
    {
      id: "time:desc",
      name: "Mới nhất",
      isSelected: false,
    },
    {
      id: "time",
      name: "cũ nhất",
      isSelected: false,
    },
  ]);
  const [slide, setSlide] = useState({ length: 0, width: 0, translateX: 0 });
  const handleSort = (e: React.MouseEvent) => {
    const value = e.currentTarget.id;
    setPage((pre) => ({ ...pre, currentPage: 0, sortBy: value }));
  };
  const handleSelectPrice = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const priceStart = e.currentTarget.dataset.priceStart;
    const priceEnd = e.currentTarget.dataset.priceEnd;
    setPage((pre: any) => ({
      ...pre,
      priceStart: priceStart,
      priceEnd: priceEnd,
    }));
  };
  const handleResetFilter = () => {
    ProductAPI.getProductsInCategoryByCategoryId(id as string)
      .then((data) => {
        setAllProducts((pre: any) => ({
          ...pre,
          products: data.pageData,
        }));
        setPage((pre) => ({
          ...pre,
          vendorId: "",
          currentPage: 0,
          pageSize: 4,
          totalPages: data.totalPages,
          sortBy: "id",
        }));
      })
      .catch(() => {
        navigate("/error");
      });
    setPage({
      vendorId: "",
      priceStart: "",
      priceEnd: "",
      currentPage: 0,
      totalPages: 0,
      pageSize: 4,
      sortBy: "id",
    });
    setPriceFilter((pre: any) => {
      return pre.map((prePrice: any) => {
        return { ...prePrice, isSelected: false };
      });
    });
    setSortFilters((pre: any) => {
      return pre.map((preSort: any) => {
        return { ...preSort, isSelected: false };
      });
    });
    setVendorFilters((pre: any) => {
      return pre.map((preVendor: any) => {
        return { ...preVendor, isSelected: false };
      });
    });
  };
  useEffect(() => {
    // *************************************************** HANDLE DOM EVENT
    console.log(id);
    if (ref.current) {
      if (window.innerWidth >= 1200) {
        setSlide((pre) => {
          return {
            length: 8,
            width: ref.current.offsetWidth / 8,
            translateX: 0,
          };
        });
      } else if (window.innerWidth >= 996) {
        setSlide((pre) => {
          return {
            length: 4,
            width: ref.current.offsetWidth / 4,
            translateX: 0,
          };
        });
      } else {
        setSlide((pre) => {
          return {
            length: 2,
            width: ref.current.offsetWidth / 2,
            translateX: 0,
          };
        });
      }
    }
    const handleResize = () => {
      if (ref.current) {
        if (window.innerWidth >= 1200) {
          setSlide((pre) => {
            return {
              length: 8,
              width: ref.current.offsetWidth / 8,
              translateX: 0,
            };
          });
        } else if (window.innerWidth >= 996) {
          setSlide((pre) => {
            return {
              length: 4,
              width: ref.current.offsetWidth / 4,
              translateX: 0,
            };
          });
        } else {
          setSlide((pre) => {
            return {
              length: 2,
              width: ref.current.offsetWidth / 2,
              translateX: 0,
            };
          });
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // **************************************************** HANDLE STATE
    window.scrollTo(0, 0);

    CategoryAPI.getPageInfo(id as string)
      .then((data) => {
        console.log(data);
        setProductsInCategory(data);
        setVendorFilters(
          data.vendors.map((vendor: any) => ({ ...vendor, isSelected: false }))
        );
        handleResetFilter();
        dispatch({
          type: ActionType.SET_BREADCUMB,
          payload: [
            {
              name: data.title,
              url: null,
            },
          ],
        });
      })
      .catch(() => {
        navigate("/error");
      });
    if (id !== null)
      ProductAPI.getProductsInCategoryByCategoryId(id as string)
        .then((data) => {
          setAllProducts((pre: any) => ({
            ...pre,
            products: data.pageData,
          }));
          setPage((pre) => ({
            ...pre,
            vendorId: vendorId,
            currentPage: 0,
            pageSize: 4,
            totalPages: data.totalPages,
            sortBy: "id",
          }));
        })
        .catch(() => {
          navigate("/error");
        });
  }, [id, vendorId]);
  useEffect(() => {
    if (id != null && page.currentPage !== 0)
      ProductAPI.getProductsInCategoryByCategoryId(
        id,
        page.currentPage.toString(),
        page.pageSize.toString(),
        page.sortBy,
        page.vendorId
      )
        .then((data) =>
          setAllProducts((pre: any) => ({
            ...pre,
            products: [...pre.products, ...data.pageData],
          }))
        )
        .catch(() => {
          navigate("/error");
        });
  }, [page.currentPage]);
  useEffect(() => {
    if (
      id != null &&
      (page.sortBy !== "id" ||
        page.priceEnd !== "" ||
        page.priceStart !== "" ||
        page.vendorId !== "")
    )
      ProductAPI.getProductsInCategoryByCategoryId(
        id,
        page.currentPage.toString(),
        page.pageSize.toString(),
        page.sortBy,
        page.vendorId,
        page.priceStart,
        page.priceEnd
      )
        .then((data) => {
          setAllProducts((pre: any) => ({
            ...pre,
            products: [...data.pageData],
          }));
          setPage((pre) => ({
            ...pre,
            currentPage: 0,
            totalPages: data.totalPages,
          }));
        })
        .catch(() => {
          navigate("/error");
        });
  }, [page.sortBy, page.priceEnd, page.priceStart, page.vendorId]);
  console.log(productsInCategory);
  console.log(id);
  console.log(page);
  console.log(vendorFilters);
  return (
    <div className="product-search  mt-lg-0 pt-lg-0 mt-5 pt-4">
      <div className="container">
        {productsInCategory.img && (
          <div className="banner-img my-3">
            <img src={productsInCategory.img} className="w-100" alt="error" />
          </div>
        )}
        <div className="brand-slide my-3 position-relative" ref={ref}>
          <SliderLeftBtn
            className={`${slide.translateX >= 0 ? "disable" : ""}`}
            handleEventClick={() => {
              if (slide.translateX < 0) {
                setSlide((pre) => {
                  return { ...pre, translateX: pre.translateX + slide.width };
                });
              }
            }}
          />
          <SliderRightBtn
            className={`${
              slide.translateX <=
              -productsInCategory.vendors.length * slide.width +
                slide.length * slide.width
                ? "disable"
                : ""
            }`}
            handleEventClick={() => {
              if (
                slide.translateX >
                -productsInCategory.vendors.length * slide.width +
                  slide.length * slide.width
              ) {
                setSlide((pre) => {
                  return {
                    ...pre,
                    translateX: pre.translateX - slide.width,
                  };
                });
              }
            }}
          />
          <ul
            style={{
              transform: `TranslateX(${slide.translateX}px)`,
              transition: "all 0.3s ease",
            }}
            className="brand-ls  list-type-none d-flex justify-content-center align-items-center"
          >
            {productsInCategory.vendors.map((vendor: any) => {
              return (
                <li
                  className="brand-it"
                  style={{ width: `${slide.width}px` }}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((pre) => ({ ...pre, vendorId: vendor.id }));
                  }}
                >
                  <p className="brand-li">
                    <img src={vendor.image} alt="" />
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className=" control-bar bg-white d-sm-flex justify-content-end align-items-center p-2">
          <span className="title">Lọc danh sách:</span>
          <button className="reset px-2" onClick={handleResetFilter}>
            <GrPowerReset />
          </button>
          <ul className="control-ls d-sm-flex align-items-center list-type-none pb-1">
            <li className="control-it mx-4 position-relative">
              <span>Thương hiệu </span>
              <b>
                {vendorFilters.find(
                  (vendor: any) => vendor.isSelected === true
                ) &&
                  " : " +
                    vendorFilters.find(
                      (vendor: any) => vendor.isSelected === true
                    ).name}
              </b>
              <span className="icon ps-2 fs-4">
                <MdKeyboardArrowDown />
              </span>
              <ul className="dropdown position-absolute list-type-none top-100 end-0 bg-white rounded text-nowrap p-2 ">
                {vendorFilters.map((vendor: any, i: number) => {
                  return (
                    <li
                      className={`p-1 ${vendor.isSelected ? "active" : ""}`}
                      id="price"
                      onClick={() => {
                        setPage((pre) => ({ ...pre, vendorId: vendor.id }));
                        setVendorFilters((pre: any) => {
                          return pre.map((preVendor: any, index: number) => {
                            if (i === index)
                              return { ...preVendor, isSelected: true };
                            return { ...preVendor, isSelected: false };
                          });
                        });
                      }}
                    >
                      {vendor.name}
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="control-it mx-4 position-relative">
              <span>Giá</span>
              {(page.priceEnd != "" || page.priceStart != "") && (
                <b>
                  :{page.priceStart !== "" && " trên " + page.priceStart}
                  {page.priceEnd !== "" && " dưới " + page.priceEnd}
                </b>
              )}
              <span className="icon ps-2 fs-4">
                <MdKeyboardArrowDown />
              </span>
              <ul className="dropdown position-absolute list-type-none top-100 end-0 bg-white rounded text-nowrap p-2 ">
                {priceFilters.map((priceFilter: any, i: number) => {
                  return (
                    <li
                      className={`p-1 ${
                        priceFilter.isSelected ? "active" : ""
                      }`}
                      id="price"
                      data-price-start={priceFilter.priceStart}
                      data-price-end={priceFilter.priceEnd}
                      onClick={(e) => {
                        handleSelectPrice(e);
                        setPriceFilter((pre: any) => {
                          return pre.map(
                            (prePriceFilter: any, index: number) => {
                              if (index === i)
                                return { ...prePriceFilter, isSelected: true };
                              return { ...prePriceFilter, isSelected: false };
                            }
                          );
                        });
                      }}
                    >
                      {priceFilter.name}
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="control-it mx-4 position-relative">
              <span>Sắp xếp</span>
              <b>
                : {""}
                {sortFilters.find((sort: any) => sort.isSelected) &&
                  sortFilters.find((sort: any) => sort.isSelected).name}
              </b>
              <span className="icon ps-2 fs-4">
                <MdKeyboardArrowDown />
              </span>
              <ul className="dropdown position-absolute list-type-none top-100 end-0 bg-white rounded text-nowrap p-2 ">
                {sortFilters.map((sort: any, i: number) => {
                  return (
                    <li
                      className={`p-1 ${sort.isSelected ? "active" : ""}`}
                      id={sort.id}
                      onClick={(e) => {
                        handleSort(e);
                        setSortFilters((pre: any) => {
                          return pre.map((preSort: any, index: number) => {
                            if (i === index) {
                              return { ...preSort, isSelected: true };
                            }
                            return { ...preSort, isSelected: false };
                          });
                        });
                      }}
                    >
                      {sort.name}
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>

        <CategoryProduct {...allProducts} />
        {page.currentPage + 1 < page.totalPages && (
          <div className="more-button text-center my-5">
            <button
              className="btn btn-outline-success"
              onClick={(e) => {
                e.preventDefault();
                setPage((pre) => ({
                  ...pre,
                  currentPage: pre.currentPage + 1,
                }));
              }}
            >
              Xem thêm sản phẩm
            </button>
          </div>
        )}
        {productsInCategory.description && (
          <div className="rich-text-content position-relative">
            <div
              className={`content mt-5 ${isShowMore ? "active" : ""}`}
              dangerouslySetInnerHTML={{
                __html: productsInCategory.description,
              }}
            ></div>
            <div className={`bg-cl ${isShowMore ? "d-none" : ""}`}></div>

            <div
              className={`view-mores py-4   ${isShowMore ? "" : "bg-white"}`}
            >
              {isShowMore ? (
                <span
                  className="py-2 px-3 bg-white"
                  onClick={() => {
                    setIsShowMore(false);
                  }}
                >
                  Thu gọn
                  <MdKeyboardDoubleArrowUp className="mb-2 ms-1 fs-4" />
                </span>
              ) : (
                <span
                  className="py-2 px-3 bg-white"
                  onClick={() => {
                    setIsShowMore(true);
                  }}
                >
                  Xem thêm
                  <MdKeyboardDoubleArrowDown className="mb-2 ms-1 fs-4" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
