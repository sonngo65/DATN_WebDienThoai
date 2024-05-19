import { useEffect, useRef, useState } from "react";
import RelatedProductItem from "./RelatedProductItem";
import { SliderLeftBtn, SliderRightBtn } from "../SliderBtn";
import { ProductAPI } from "../../../../../api";
import { useNavigate } from "react-router-dom";
export default function RelatedProductList({
  categoryId,
  productId,
}: {
  categoryId: string;
  productId: string;
}) {
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const [width, setWidth] = useState(0);
  // const relatedProducts = [
  //   {
  //     img: "../related-product1.webp",

  //     name: "Realme C53 6/128gb cũ",
  //     rating: 0,
  //     price: 2890000,
  //     compareToPrice: 3000000,
  //   },
  //   {
  //     img: "../related-product2.webp",

  //     name: "Realme V30T 5G mới",
  //     rating: 0,
  //     price: 2890000,
  //     compareToPrice: 3000000,
  //   },
  //   {
  //     img: "../related-product2.webp",

  //     name: "Infinix Note 30 8GB /256GB Lướt như mới",
  //     rating: 0,
  //     price: 2890000,
  //     compareToPrice: 3000000,
  //   },
  //   {
  //     img: "../related-product2.webp",

  //     name: "Infinix Note 30 8GB /256GB Lướt như mới",
  //     rating: 0,
  //     price: 2890000,
  //     compareToPrice: 3000000,
  //   },
  // ];
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [slide, setSlide] = useState({ slideLength: 3, translateX: 0 });
  useEffect(() => {
    ProductAPI.getRelatedProductByCategoryId(categoryId, productId)
      .then((data) => {
        setRelatedProducts(data);
      })
      .catch(() => {
        navigate("/error");
      });
  }, [categoryId, productId]);
  const handleSlideLeftClick = () => {
    console.log(width);
    if (
      slide.translateX >
      -relatedProducts.length * width + slide.slideLength * width
    ) {
      setSlide((pre) => {
        return { ...pre, translateX: pre.translateX - width };
      });
    }
  };
  const handleSlideRightClick = () => {
    if (slide.translateX < 0) {
      setSlide((pre) => {
        return { ...pre, translateX: pre.translateX + width };
      });
    }
  };
  useEffect(() => {
    ref.current && setWidth(ref.current.offsetWidth / 3);
    const handleResize = () => {
      if (ref.current) {
        if (window.innerWidth >= 1200) {
          setWidth(ref.current.offsetWidth / 3);
          setSlide((pre) => {
            return { ...pre, slideLength: 3 };
          });
        } else if (window.innerWidth >= 992) {
          setWidth(ref.current.offsetWidth / 2);
          setSlide((pre) => {
            return { ...pre, slideLength: 2 };
          });
        } else {
          setWidth(ref.current.offsetWidth);
          setSlide((pre) => {
            return { ...pre, slideLength: 1 };
          });
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(slide);
  return (
    <div className="related-product mt-3 pt-2" ref={ref}>
      <div className="related-product-head">
        <div className="title">San pham lien quan</div>
        <div className="control">
          <SliderLeftBtn
            className={`left-btn ${
              slide.translateX <=
              -relatedProducts.length * width + slide.slideLength * width
                ? "disable"
                : ""
            }`}
            handleEventClick={handleSlideLeftClick}
          />
          <SliderRightBtn
            className={`right-btn ${slide.translateX >= 0 ? "disable" : ""}`}
            handleEventClick={handleSlideRightClick}
          />
        </div>
      </div>
      <div className="slide-product d-flex">
        <ul
          className="related-product-ls list-type-none"
          style={{
            transform: `TranslateX(${slide.translateX}px)`,
            transition: "all 0.3s ease",
          }}
        >
          {relatedProducts.map((relatedProduct) => {
            return (
              <li
                className="related-product-it "
                style={{ width: `${width}px` }}
              >
                <RelatedProductItem {...relatedProduct} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
