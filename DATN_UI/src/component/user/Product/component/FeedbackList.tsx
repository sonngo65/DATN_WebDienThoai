import { useEffect, useRef, useState } from "react";
import useSlider from "../../../../custom/useSlider";
import { Feedback } from "../../../../model";
import { SliderLeftBtn, SliderRightBtn } from "./SliderBtn";
import { url } from "../../../../api";
interface FeedbackListProps {
  feedbacks: Feedback[];
}
export default function FeedbackList({ feedbacks }: FeedbackListProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [width, setWidth] = useState(0);
  const { animation, handleEventClickLeftBtn, handleEventClickRightBtn } =
    useSlider({
      length: feedbacks.length,
      width: ref.current ? width : 0,
    });
  useEffect(() => {
    ref.current && setWidth(ref.current.offsetWidth / 2);
    const getwidth = () => {
      if (ref.current) {
        if (window.innerWidth >= 992) {
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
    <div className="feedback-slider" ref={ref}>
      <SliderLeftBtn handleEventClick={handleEventClickLeftBtn} />
      <SliderRightBtn handleEventClick={handleEventClickRightBtn} />
      <div
        className="feedback-slider-outer d-flex justify-content-center"
        style={{
          transform: `translateX(${animation.translateX1}px)`,
          transition: `all ${
            animation.translateX1 === animation.transition ? 0 : 1
          }s ease`,
        }}
      >
        {feedbacks.map(({ nameCustomer, image, fieldCustomer, content }) => {
          return (
            <div
              className="feedback-slider-item"
              style={{ width: `${width}px` }}
            >
              <div className="row">
                <div className="col-12 col-sm-4 feedback-slider-item__img">
                  <img src={url + image} alt={nameCustomer} />
                </div>
                <div className="col-12 col-sm-8 feedback-slider-item__info">
                  <h5 className="info__name">{nameCustomer}</h5>
                  <h5 className="info__field">{fieldCustomer}</h5>
                  <p className="info__desciption">{content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* fake */}
      <div
        className="feedback-slider-outer d-flex justify-content-center"
        style={{
          transform: `translateX(${animation.translateX2}px)`,
          transition: `all ${
            animation.translateX2 === animation.transition ? 0 : 1
          }s ease`,
        }}
      >
        {feedbacks.map(({ nameCustomer, image, fieldCustomer, content }) => {
          return (
            <div
              className="feedback-slider-item"
              style={{ width: `${width}px` }}
            >
              <div className="row">
                <div className="col-12 col-sm-4 feedback-slider-item__img">
                  <img src={url + image} alt={nameCustomer} />
                </div>
                <div className="col-12 col-sm-8 feedback-slider-item__info">
                  <h5 className="info__name">{nameCustomer}</h5>
                  <h5 className="info__field">{fieldCustomer}</h5>
                  <p className="info__desciption">{content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* fake */}
      <div
        className="feedback-slider-outer d-flex "
        style={{
          transform: `translateX(${animation.translateX3}px)`,
          transition: `all ${
            animation.translateX3 === animation.transition ? 0 : 1
          }s ease`,
        }}
      >
        {feedbacks.map(({ nameCustomer, image, fieldCustomer, content }) => {
          return (
            <div
              className="feedback-slider-item"
              style={{ width: `${width}px` }}
            >
              <div className="row">
                <div className="col-12 col-sm-4 feedback-slider-item__img">
                  <img src={url + image} alt={nameCustomer} />
                </div>
                <div className="col-12 col-sm-8 feedback-slider-item__info">
                  <h5 className="info__name">{nameCustomer}</h5>
                  <h5 className="info__field">{fieldCustomer}</h5>
                  <p className="info__desciption">{content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
