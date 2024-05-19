import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import useSlider from "../../../../custom/useSlider";
import { Product } from "../../../../model";
import ProductItem from "./ProductItem";
import { SliderLeftBtn, SliderRightBtn } from "./SliderBtn";
import SlideBanner from "../../SlideBanner";
import { useEffect, useRef, useState } from "react";
interface ProductSliderBoxProps {
  products: Product[];
  className?: string;
}
export default function ProductSliderList({
  products,
  className,
}: ProductSliderBoxProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [width, setWidth] = useState(0);
  const { animation, handleEventClickLeftBtn, handleEventClickRightBtn } =
    useSlider({
      length: products.length > 4 ? products.length : 0,
      width: products.length > 4 ? width : 0,
    });
  useEffect(() => {
    ref.current && setWidth(ref.current.offsetWidth / 4);
    const getwidth = () => {
      if (ref.current) {
        if (window.innerWidth >= 992) {
          setWidth(ref.current.offsetWidth / 4);
        } else if (window.innerWidth >= 768) {
          setWidth(ref.current.offsetWidth / 3);
        } else if (window.innerWidth >= 576) {
          setWidth((ref.current.offsetWidth * 3) / 8);
        } else if (window.innerWidth >= 362) {
          setWidth((ref.current.offsetWidth * 2) / 3);
        } else {
          setWidth(ref.current.offsetWidth);
        }
      }
    };
    window.addEventListener("resize", getwidth);
    return () => window.removeEventListener("resize", getwidth);
  }, []);
  return (
    <div className={`product-sli-ls ${className}`} ref={ref}>
      {products.length > 4 && (
        <>
          <SliderLeftBtn handleEventClick={handleEventClickLeftBtn} />
          <SliderRightBtn handleEventClick={handleEventClickRightBtn} />
        </>
      )}

      <div
        className="product-sli-ls-outer"
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
              <div className="p-1" style={{ width: `${width}px` }}>
                <ProductItem {...product} />
              </div>
            );
          })}
        </div>
      </div>
      {products.length > 4 && (
        <>
          {" "}
          <div
            className="product-sli-ls-outer"
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
                  <div className="p-1" style={{ width: `${width}px` }}>
                    <ProductItem {...product} />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="product-sli-ls-outer"
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
                  <div className="p-1" style={{ width: `${width}px` }}>
                    <ProductItem {...product} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
