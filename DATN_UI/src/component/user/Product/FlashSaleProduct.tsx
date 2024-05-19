import { useEffect, useState } from "react";
import { MdOutlineFlashOn } from "react-icons/md";
import { clear } from "console";
import useSlider from "../../../custom/useSlider";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import ProductItem from "./component/ProductItem";
import ProductSliderList from "./component/ProductSliderList";
import { ProductAPI } from "../../../api";
import useFormatDate from "../../../custom/useFormatDate";
import { useNavigate } from "react-router-dom";
export default function FlashSaleProduct() {
  const navigate = useNavigate();
  // const products = [
  //   {
  //     id: 1,
  //     name: "Vivo V29e - 5G - Chính hãng",
  //     price: 7790000,
  //     originalPrice: 8990000,
  //     img: "/xanh-song-bang-6.webp",
  //     summary:
  //       "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //     endow: "giam 10%",
  //     sticker: "/apple.png",
  //   },
  //   {
  //     id: 2,
  //     name: "realme C55 - 6GB/128GB - Chính hãng",
  //     price: 4190000,
  //     originalPrice: 5990000,
  //     img: "/c55-1-den.webp",
  //     summary:
  //       "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //     endow: "giam 10%",
  //   },
  //   {
  //     id: 13,
  //     name: "Vivo V29e - 5G - Chính hãng",
  //     price: 7790000,
  //     originalPrice: 8990000,
  //     img: "/xanh-song-bang-6.webp",
  //     summary:
  //       "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //     endow: "giam 10%",
  //   },
  //   {
  //     id: 2,
  //     name: "realme C55 - 6GB/128GB - Chính hãng",
  //     price: 4190000,
  //     originalPrice: 5990000,
  //     img: "/c55-1-den.webp",
  //     summary:
  //       "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //     endow: "giam 10%",
  //   },
  //   {
  //     id: 13,
  //     name: "Vivo V29e - 5G - Chính hãng",
  //     price: 7790000,
  //     originalPrice: 8990000,
  //     img: "/xanh-song-bang-6.webp",
  //     summary:
  //       "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //     endow: "giam 10%",
  //   },
  //   {
  //     id: 2,
  //     name: "realme C55 - 6GB/128GB - Chính hãng",
  //     price: 4190000,
  //     originalPrice: 5990000,
  //     img: "/c55-1-den.webp",
  //     summary:
  //       "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //     endow: "giam 10%",
  //   },
  // ];
  const [flashSaleProducts, setFlashSaleProducts] = useState<any>({
    products: [],
    endTime: null,
  });
  useEffect(() => {
    ProductAPI.getAllFlashSaleProducts()
      .then((data) => {
        setFlashSaleProducts(data);
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);

  return (
    <>
      {flashSaleProducts && (
        <div className="fl-sale mt-3">
          <div className=" fl-sale__head row g-2 mb-3">
            <h2 className="fl-sale__head-title col-12 col-lg-6 pt-2">
              F<MdOutlineFlashOn />
              ASH SALE ONLINE
            </h2>
            {/* <ul className="fl-sale__head-control-ls col-12 col-lg-6 list-type-none">
              <li className="fl-sale__head-control-it active">
                <a href="" className="fl-sale__head-control-li ">
                  Dien thoai/Table
                </a>
              </li>
              <li className="fl-sale__head-control-it">
                <a href="" className="fl-sale__head-control-li">
                  Laptop/Man hinh/Tivi
                </a>
              </li>
              <li className="fl-sale__head-control-it">
                <a href="" className="fl-sale__head-control-li">
                  Dong hoc/Phu kien/Khac
                </a>
              </li>
            </ul> */}
            <TimeUp time={flashSaleProducts.endTime} />
          </div>
          {/* <div className="fl-sale__content ">
        <div className="fl-sale__content__control left">
          <button onClick={handleEventClickLeftBtn}>
            <FaCaretLeft />
          </button>
        </div>
        <div className="fl-sale__content__control right">
          <button onClick={handleEventClickRightBtn}>
            <FaCaretRight />
          </button>
        </div>

        <div
          className="fl-sale__content-outer"
          style={{
            transform: `translateX(${animation.translateX1}px)`,
            transition: `all ${
              animation.translateX1 === animation.transition ? 0 : 1
            }s ease`,
          }}
        >
          <div className="d-flex">
            {products.map((product) => {
              return (
                <div className="col-3 p-1">
                  <ProductItem {...product} />
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="fl-sale__content-outer"
          style={{
            transform: `translateX(${animation.translateX2}px)`,
            transition: `all ${
              animation.translateX2 === animation.transition ? 0 : 1
            }s ease`,
          }}
        >
          <div className="d-flex">
            {products.map((product) => {
              return (
                <div className="col-3 p-1">
                  <ProductItem {...product} />
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="fl-sale__content-outer"
          style={{
            transform: `translateX(${animation.translateX3}px)`,
            transition: `all ${
              animation.translateX3 === animation.transition ? 0 : 1
            }s ease`,
          }}
        >
          <div className="d-flex">
            {products.map((product) => {
              return (
                <div className="col-3 p-1">
                  <ProductItem {...product} />
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
          <ProductSliderList
            className="fl-sale-prd"
            products={flashSaleProducts.products}
          />
        </div>
      )}
    </>
  );
}
const TimeUp = ({ time }: { time: any }) => {
  const { customFormatDuration } = useFormatDate();
  const [duration, setDuration] = useState<any>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const timeOut = new Promise(function (resolve) {
    setTimeout(() => {
      resolve("oke");
    }, 1000);
  });
  useEffect(() => {
    timeOut.then((response: any) => {
      const now = new Date();
      const endTime = new Date(time);

      if (time && now >= endTime) {
        ProductAPI.deleteProductFromFlashSale();
        return;
      }

      setDuration(customFormatDuration(0, time));
    });
  }, [duration]);
  return (
    <div className="fl-sale__time col-12 ">
      <span className="bag">
        <span>
          {" "}
          <span>
            {duration.hours
              ? duration.hours.toString().split("").length > 1
                ? duration.hours.toString().split("")[0]
                : 0
              : 0}
          </span>
        </span>
      </span>
      <span className="bag">
        <span>
          {duration.hours
            ? duration.hours.toString().split("").length > 1
              ? duration.hours.toString().split("")[1]
              : duration.hours.toString().split("")[0]
            : 0}
        </span>
      </span>
      <span className="two-dot">:</span>
      <span className="bag">
        <span>
          {duration.minutes
            ? duration.minutes.toString().split("").length > 1
              ? duration.minutes.toString().split("")[0]
              : 0
            : 0}
        </span>
      </span>
      <span className="bag">
        <span>
          {duration.minutes
            ? duration.minutes.toString().split("").length > 1
              ? duration.minutes.toString().split("")[1]
              : duration.minutes.toString().split("")[0]
            : 0}
        </span>
      </span>
      <span className="two-dot">:</span>
      <span className="bag">
        <span>
          {duration.seconds
            ? duration.seconds.toString().split("").length > 1
              ? duration.seconds.toString().split("")[0]
              : 0
            : 0}
        </span>
      </span>
      <span className="bag">
        <span>
          {duration.seconds
            ? duration.seconds.toString().split("").length > 1
              ? duration.seconds.toString().split("")[1]
              : duration.seconds.toString().split("")[0]
            : 0}
        </span>
      </span>
    </div>
  );
};
