import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { resolve } from "path";
import useSlider from "../../../custom/useSlider";
import { BannerAPI } from "../../../api";
import { useNavigate } from "react-router-dom";
export default function Banner() {
  const navigate = useNavigate();
  const ref = useRef<HTMLHeadingElement>(null);
  const [width, setWidth] = useState(0);
  const [banner, setBanner] = useState<any>({
    primaryBanner: null,
    slideBanner: [],
  });

  const { animation, handleEventClickLeftBtn, handleEventClickRightBtn } =
    useSlider({ length: banner.slideBanner.length, width: width });
  useEffect(() => {
    BannerAPI.getHomeBanner()
      .then((data) => {
        setBanner(data);
      })
      .catch(() => {
        navigate("/error");
      });

    // *******************************************************************
    ref.current && setWidth(ref.current.offsetWidth / 2);
    const getwidth = () => {
      if (ref.current) {
        if (window.innerWidth >= 768) {
          setWidth(ref.current.offsetWidth / 2);
        } else {
          setWidth(ref.current.offsetWidth);
        }
      }
    };
    window.addEventListener("resize", getwidth);
    return () => window.removeEventListener("resize", getwidth);
  }, []);
  return (
    <>
      <div className="banner d-none d-lg-block">
        <img src={banner.primaryBanner} />
      </div>
      <div className="container">
        <div className="slide-banner mt-5 mt-md-0" ref={ref}>
          <div className="slide-banner__btn slide-banner__btn-left">
            <button onClick={handleEventClickLeftBtn}>
              <FaChevronLeft />
            </button>
          </div>
          <div className="slide-banner__btn slide-banner__btn-right">
            <button onClick={handleEventClickRightBtn}>
              <FaChevronRight />
            </button>
          </div>
          <div
            className="slide-banner-outer g-0"
            style={{
              transform: `translateX(${animation.translateX1}px)`,
              transition: `all ${
                animation.translateX1 === animation.transition ? 0 : 1
              }s ease`,
            }}
          >
            {banner.slideBanner.map((slideItem: any) => {
              return (
                <div
                  className="slide-banner-item"
                  style={{ width: `${width}px` }}
                >
                  <img src={`${slideItem}`} alt="error" />
                </div>
              );
            })}
          </div>
          {/* fake slide item  */}
          <div
            className="slide-banner-outer g-0"
            style={{
              transform: `translateX(${animation.translateX2}px)`,
              transition: `all ${
                animation.translateX2 === animation.transition ? 0 : 1
              }s ease`,
            }}
          >
            {banner.slideBanner.map((slideItem: any) => {
              return (
                <div
                  className="slide-banner-item"
                  style={{ width: `${width}px` }}
                >
                  <img src={`${slideItem}`} alt="error" />
                </div>
              );
            })}
          </div>

          <div
            className="slide-banner-outer g-0"
            style={{
              transform: `translateX(${animation.translateX3}px)`,
              transition: `all ${
                animation.translateX3 === animation.transition ? 0 : 1
              }s ease`,
            }}
          >
            {banner.slideBanner.map((slideItem: any) => {
              return (
                <div
                  className="slide-banner-item"
                  style={{ width: `${width}px` }}
                >
                  <img src={`${slideItem}`} alt="error" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
