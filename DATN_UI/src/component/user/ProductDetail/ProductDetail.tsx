import { useEffect, useRef, useState } from "react";
import { Params, redirect, useNavigate, useParams } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import { FaRegStar } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";

import { SliderLeftBtn, SliderRightBtn } from "../Product/component/SliderBtn";
import RelatedProductList from "../Product/component/RelatedProduct/RelatedProductList";
import { CartAPI, CategoryAPI, ProductAPI } from "../../../api";
import { formatMoney } from "../../../untils";
import { useDispatch } from "react-redux";
import * as ActionType from "../../../store/actionTypes";
import * as ActionCreator from "../../../store/actionCreators";
import { IoFlash } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
export default function ProductDetail() {
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [width, setWidth] = useState(0);
  const [isShowMore, setIsShowMore] = useState(false);
  const [product, setProduct] = useState<createProductRequest>({
    id: "",
    name: "",
    content: "",
    summary: "",
    specification: "",

    isBestSeller: false,
    price: 0,
    originalPrice: 0,
    img: "",
    optionDetails: [],
    options: [],
    childImage: [],
    parentCategoryId: "",
    vendorId: "",
    childCategoryId: [],
    status: 1,
  });
  const [optionSelected, setOptionSelected] = useState<{
    option1: string | null;
    option2: string | null;
  }>({
    option1: "",
    option2: "",
  });
  const [newCartItem, setNewCartItem] = useState<{
    optionDetailId: string | null;
    quantity: number;
  }>({
    optionDetailId: "",
    quantity: 1,
  });
  // const [payment, setPayment] = useState<{
  //   optionDetailId: string;
  //   name: string;
  //   optionName: string;
  //   image: string;
  //   price: number;
  //   quantity: number;
  // }>({
  //   optionDetailId: "",
  //   name: "",
  //   optionName: "",
  //   image: "",
  //   price: 0,
  //   quantity: 0,
  // });
  const [images, setImages] = useState([{ id: 0, img: "", isShow: false }]);

  const [slide, setSlide] = useState({
    locate: [0, 4],
    translateX: 0,
  });
  const handleClickThumb = (id: number) => {
    setImages((pre: any) => {
      return pre.map((image: any) => {
        return image.id === id
          ? { ...image, isShow: true }
          : { ...image, isShow: false };
      });
    });
  };
  const handleClickLeftBtn = () => {
    let isShowIndex = images.findIndex((image) => image.isShow === true);

    if (isShowIndex > 0) {
      if (isShowIndex <= slide.locate[0]) {
        setSlide((pre) => {
          return {
            locate: [pre.locate[0] - 1, pre.locate[1] - 1],
            translateX: pre.translateX + width,
          };
        });
      }
      setImages((pre) => {
        return pre.map((image, index) => {
          return index === isShowIndex - 1
            ? { ...image, isShow: true }
            : { ...image, isShow: false };
        });
      });
    }
  };
  const handleClickRightBtn = () => {
    let isShowIndex = images.findIndex((image) => image.isShow === true);
    if (isShowIndex < images.length - 1) {
      if (isShowIndex >= slide.locate[1]) {
        setSlide((pre) => {
          return {
            locate: [pre.locate[0] + 1, pre.locate[1] + 1],
            translateX: pre.translateX - width,
          };
        });
      }
      setImages((pre) => {
        return pre.map((image, index) => {
          return index === isShowIndex + 1
            ? { ...image, isShow: true }
            : { ...image, isShow: false };
        });
      });
    }
  };

  //*******************************************************HANDEL SELECT OPTION */
  const handleSelectedOption = (index: number, option: string) => {
    console.log("handle click selected", index, option);
    setOptionSelected((pre: any) => {
      if (index === 0) return { ...pre, option1: option };
      if (index === 1) return { ...pre, option2: option };
    });
  };
  // **********************************************************
  const handleAddCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!sessionStorage.getItem("account")) {
      dispatch({ type: ActionType.NOT_LOGIN });
      navigate("/");
      return;
    }
    const optionDetail = product.optionDetails.find(
      (optionDetail: any) => optionDetail.id === newCartItem.optionDetailId
    );
    if (optionDetail && optionDetail.quantity < newCartItem.quantity) {
      window.alert("Số lượng hàng không đủ !");
      return;
    }

    CartAPI.add({
      ...newCartItem,
      accountId: sessionStorage.getItem("account")
        ? JSON.parse(sessionStorage.getItem("account") as string).id
        : null,
    } as CartRequest)
      .then((data) => {
        const oldCarts: Array<any> = JSON.parse(
          sessionStorage.getItem("carts") as string
        );
        if (oldCarts.find((oldCart: any) => oldCart.id === data.id)) {
          sessionStorage.setItem(
            "carts",
            JSON.stringify(
              oldCarts.map((oldCart) => {
                if (oldCart.id === data.id) return data;
                return oldCart;
              })
            )
          );
        } else {
          sessionStorage.setItem("carts", JSON.stringify([...oldCarts, data]));
        }
        dispatch({ type: ActionType.LOGIN, payload: data });
        window.alert("Thêm sản phẩm vào giỏ hàng thành công !");
      })
      .catch(() => {
        navigate("/error");
      });
  };
  const handlePayment = (e: React.MouseEvent) => {
    e.preventDefault();
    handleAddCart(e);
    navigate("/payment");
  };
  //*************************************************** */
  useEffect(() => {
    // *****************************************************State HANLE
    window.scrollTo(0, 0);

    if (id)
      ProductAPI.get(id)
        .then((data) => {
          setProduct(data);
          // setImages(data.childImage);
          CategoryAPI.getById(data.parentCategoryId)
            .then((categoryResponse) => {
              console.log(
                {
                  name: categoryResponse.name,
                  url: `categoris/${categoryResponse.id}`,
                },
                {
                  name: data.name,
                  url: null,
                }
              );
              dispatch({
                type: ActionType.SET_BREADCUMB,
                payload: [
                  {
                    name: categoryResponse.name,
                    url: `categories/${categoryResponse.id}`,
                  },
                  {
                    name: data.name,
                    url: null,
                  },
                ],
              });
            })
            .catch(() => {
              navigate("/error");
            });
        })
        .catch(() => {
          navigate("/error");
        });
    setIsShowMore(false);
    // ******************************************************* DOM HANDLE
    if (ref.current) {
      if (window.innerWidth >= 1200) {
        setWidth(ref.current.offsetWidth / 5);
        setSlide((pre) => {
          return { ...pre, locate: [0, 4] };
        });
      } else if (window.innerWidth >= 996) {
        setWidth(ref.current.offsetWidth / 4);
        setSlide((pre) => {
          return { ...pre, locate: [0, 3] };
        });
      } else {
        setWidth(ref.current.offsetWidth / 3);

        setSlide((pre) => {
          return { ...pre, locate: [0, 2] };
        });
      }
    }
    const resizeHandle = () => {
      if (ref.current) {
        if (window.innerWidth >= 1200) {
          setWidth(ref.current.offsetWidth / 5);
          setSlide((pre) => {
            return { ...pre, locate: [0, 4] };
          });
        } else if (window.innerWidth >= 996) {
          setWidth(ref.current.offsetWidth / 4);
          setSlide((pre) => {
            return { ...pre, locate: [0, 3] };
          });
        } else {
          setWidth(ref.current.offsetWidth / 3);

          setSlide((pre) => {
            return { ...pre, locate: [0, 2] };
          });
        }
      }
    };
    window.addEventListener("resize", resizeHandle);
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, [id]);
  useEffect(() => {
    product.childImage &&
      setImages(
        product.childImage.map((image, index) => ({
          id: index,
          img: image,
          isShow: index === 0,
        }))
      );
  }, [product.childImage, id]);
  useEffect(() => {
    console.log(product.options);
    setOptionSelected({
      option1: product.options[0]
        ? product.options[0].childOptions[0].name
        : "",
      option2: product.options[1]
        ? product.options[1].childOptions[0].name
        : null,
    });
  }, [product.options, id]);

  useEffect(() => {
    let productDetail: any = product.optionDetails.find(
      (optionDetail) =>
        (optionDetail.option1 === optionSelected.option1 &&
          optionDetail.option2 === optionSelected.option2) ||
        (optionDetail.option1 === optionSelected.option2 &&
          optionDetail.option2 === optionSelected.option1)
    );
    if (!productDetail) return;
    setProduct((pre) => ({
      ...pre,
      price: productDetail?.price ? productDetail?.price : pre.price,
      originalPrice: productDetail?.originalPrice
        ? productDetail?.originalPrice
        : pre.originalPrice,
    }));
    setNewCartItem((pre) => ({
      ...pre,
      optionDetailId: productDetail?.id ? productDetail?.id : null,
    }));
    // setPayment((pre) => ({
    //   optionDetailId: productDetail.id,
    //   name: product.name,
    //   optionName: `${productDetail.option1} ${
    //     productDetail ? "/" + productDetail.option2 : "null"
    //   }`,
    //   price: productDetail.price,
    //   quantity: newCartItem.quantity,
    //   image: productDetail.image,
    // }));
    setImages((pre: any) => {
      if (productDetail?.image)
        return pre.map((preImage: any) => ({
          ...preImage,
          isShow: preImage.img === productDetail?.image,
        }));
      return pre;
    });
  }, [optionSelected, id]);

  console.log(product);
  return (
    <div className="container bg-white product-detail-container mt-lg-3 mb-lg-3 mt-5 pt-5">
      <div className="product-detail">
        <div className="row">
          <div className="col-12 col-md-5 col-xl-4">
            <div className="product-imgs position-relative" ref={ref}>
              <SliderLeftBtn
                className="t-40"
                handleEventClick={handleClickLeftBtn}
              />
              <SliderRightBtn
                className="t-40"
                handleEventClick={handleClickRightBtn}
              />
              {product.flashSalePrice && (
                <span className="product__flash-sale">
                  <IoFlash /> Giảm {formatMoney(product.flashSalePrice)} ₫
                </span>
              )}

              <div className="product-slide">
                <div className="main-slide-product">
                  {images.map((image) => {
                    return (
                      <div
                        className={`main-item ${image.isShow ? "show" : ""}`}
                      >
                        <img src={image.img} alt={image.img} />
                      </div>
                    );
                  })}
                </div>
                <div
                  className="thumb-slide-product"
                  style={{
                    transform: `TranslateX(${slide.translateX}px)`,
                    transition: `all 0.3s ease`,
                  }}
                >
                  {images.map((image) => {
                    return (
                      <div
                        onClick={() => {
                          handleClickThumb(image.id);
                        }}
                        className={`thumb-item ${image.isShow ? "show" : ""}`}
                        style={{ width: `${width}px`, height: `${width}px` }}
                      >
                        <img src={image.img} alt={image.img} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-7 col-xl-4">
            <div className="product-name mt-2">
              {product.name}
              {product.flashSalePrice && (
                <span className="flash-sale ms-2">flash Sale</span>
              )}
            </div>
            <div className="product-rating mt-1">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
            </div>
            <div className="product-price mt-4">
              {formatMoney(product.price)} ₫
              <span className="strike fw-bold fs-6">
                {formatMoney(product.originalPrice)} ₫
              </span>
            </div>
            <div className="product-buy-options mt-4">
              {product.options.map((option, index) => {
                return (
                  <div className={`option-item border-0`}>
                    <p className="title">{option.title}</p>
                    <ul className="list list-type-none">
                      {option.childOptions.map((childOption, i) => {
                        return (
                          <li
                            key={i}
                            className={`${
                              childOption.name === optionSelected.option1 ||
                              childOption.name === optionSelected.option2
                                ? "selected"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(childOption.name);
                              handleSelectedOption(index, childOption.name);
                            }}
                          >
                            <input type="radio" id="1" />
                            <div className="label">
                              <label htmlFor="1">{childOption.name}</label>
                            </div>
                            <div className="sticker">
                              <ImCheckmark />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              {/* <div className="option-item">
                <p className="title">Phien ban</p>
                <ul className="list list-type-none">
                  <li>
                    <input type="radio" id="1" />
                    <div className="label">
                      <label htmlFor="1">xau 98%</label>
                    </div>
                    <div className="sticker">
                      <ImCheckmark />
                    </div>
                  </li>
                  <li>
                    <input type="radio" id="1" />
                    <div className="label">
                      <label htmlFor="1">dep 99%</label>
                    </div>
                    <div className="sticker">
                      <ImCheckmark />
                    </div>
                  </li>
                </ul>
              </div> */}
              <div className="product-quantity d-flex justify-content-start align-items-center mt-3">
                <p>Số lượng:</p>
                <button
                  className="minus-btn ms-5"
                  onClick={(e) => {
                    setNewCartItem((pre) => ({
                      ...pre,
                      quantity: pre.quantity > 0 ? pre.quantity - 1 : 0,
                    }));
                  }}
                >
                  <FaMinus />
                </button>
                <button
                  className="plus-btn ms-2"
                  onClick={(e) => {
                    setNewCartItem((pre) => ({
                      ...pre,
                      quantity: pre.quantity + 1,
                    }));
                  }}
                >
                  <FaPlus />
                </button>
                <input
                  className="ms-2"
                  type="number"
                  value={newCartItem.quantity}
                  onChange={(e) => {
                    e.preventDefault();
                    const value = e.currentTarget.value;
                    setNewCartItem((pre) => ({
                      ...pre,
                      quantity: Number.parseInt(value),
                    }));
                  }}
                />
              </div>
              <div className="product-btn row g-1 mt-3">
                <div className="buy-now col-12 col-md-8">
                  <button
                    className="d-flex flex-column justify-content-center align-items-center"
                    onClick={handlePayment}
                  >
                    <span>Mua ngay</span>
                    <small>Giao tận nơi hoặc lấy tại cửa hàng</small>
                  </button>
                </div>
                <div className="add-cart col-12 col-md-4">
                  <button
                    className="d-flex flex-column justify-content-center align-items-center"
                    onClick={handleAddCart}
                  >
                    <span>
                      <BsCart4 />
                    </span>
                    <small>Thêm giỏ hàng</small>
                  </button>
                </div>
              </div>
            </div>

            <div className="product-summary mt-3">
              <div dangerouslySetInnerHTML={{ __html: product.summary }}></div>
            </div>
          </div>
          <div className="col-12 col-lg-12 col-xl-4">
            <div className="hotline alert alert-warning mt-2">
              Gọi ngay <span>0879.69.8115</span> <br /> để được tư vấn tốt nhất!
            </div>
            <div className="product-info">
              Tình trạng:{" "}
              {product.status === 1 ? (
                <span className="text-success">Còn hàng</span>
              ) : (
                <span className="text-danger">Hết hàng</span>
              )}
              {product.vendorName && (
                <>
                  <br />
                  Thương hiệu:{" "}
                  <span className="text-success">{product.vendorName}</span>
                </>
              )}
              {product.parentCategoryName && (
                <>
                  <br />
                  Loại:{" "}
                  <span className="text-success">
                    {product.parentCategoryName}
                  </span>
                </>
              )}
            </div>
            <div className="gift mt-4">
              <span className="gift-img">
                <img src="../gift.webp" alt="error" />
                <span>Ưu đãi</span>
              </span>
              - Giảm giá sâu nhiều sản phẩm
              <br />
              - Giảm giá Phụ kiện 30% tối đa 200k khi mua kèm điện thoại
              <br />
              - Giảm 5% tối đa 500k khi thanh toán qua Kredivo, Home paylater
              lần đầu
              <br />
            </div>
          </div>
          <div className="row mt-3 pb-4">
            <div className="col-12 col-lg-9">
              {" "}
              <div className="product-desc">
                <h5>Thông tin chi tiết</h5>
                <div className="rich-text-content position-relative">
                  <div
                    className={`content mt-5 ${isShowMore ? "active" : ""}`}
                    dangerouslySetInnerHTML={{
                      __html: product.content,
                    }}
                  ></div>
                  <div className={`bg-cl ${isShowMore ? "d-none" : ""}`}></div>

                  <div
                    className={`view-mores py-4   ${
                      isShowMore ? "" : "bg-white"
                    }`}
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
              </div>
              {product.parentCategoryId && product.id && (
                <RelatedProductList
                  categoryId={product.parentCategoryId}
                  productId={product.id}
                />
              )}
            </div>
            <div className="col-12 mt-3 mt-lg-0 col-lg-3">
              <div className="product-special ">
                <h5>Thông số kỹ thuật</h5>
                {product.specification && (
                  <div
                    className={`specification mt-5 w-100`}
                    dangerouslySetInnerHTML={{
                      __html: product.specification,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
