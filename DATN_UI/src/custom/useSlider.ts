import { useEffect, useRef, useState } from "react";
import { convertCompilerOptionsFromJson } from "typescript";

interface useSliderProps {
  length: number;
  width: number;
}
export default function useSlider({ length, width }: useSliderProps) {
  const [isAutoSlide, setIsAutoSlide] = useState(true);
  const [isClick, setIsClick] = useState(false);
  const [animation, setAnimation] = useState({
    translateX1: -length * width,
    translateX2: 0,
    translateX3: length * width,
    transition: (length - 1) * width,
  });
  const translates = [
    animation.translateX1,
    animation.translateX2,
    animation.translateX3,
  ];
  const indexMax = (translates: number[], isMin = false) => {
    let temp: any = null,
      index = 0;
    translates.forEach((value, i) => {
      if (!isMin) {
        if (temp === null || temp < value) {
          temp = value;
          index = i;
        }
      } else {
        if (value < temp || temp === null) {
          temp = value;
          index = i;
        }
      }
    });
    return index;
  };

  const updateAnimation = () => {
    setAnimation({
      translateX1: -length * width,
      translateX2: 0,
      translateX3: length * width,
      transition: (length - 1) * width,
    });
  };

  const effect = () => {
    return setInterval(() => {
      setAnimation((pre) => {
        return {
          translateX1:
            pre.translateX1 <= -length * width
              ? pre.translateX1 + 3 * length * width - width
              : pre.translateX1 - width,

          translateX2:
            pre.translateX2 <= -length * width
              ? pre.translateX2 + 3 * length * width - width
              : pre.translateX2 - width,
          translateX3:
            pre.translateX3 <= -length * width
              ? pre.translateX3 + 3 * length * width - width
              : pre.translateX3 - width,
          transition:
            (pre.translateX1 <= -length * width
              ? pre.translateX1
              : pre.translateX2 <= -length * width
              ? pre.translateX2
              : pre.translateX3) +
            3 * length * width -
            width,
        };
      });
    }, 3000);
  };

  //clear interval when click on control button
  useEffect(() => {
    var time = effect();
    if (!isAutoSlide) {
      clearInterval(time);
    }
    return () => {
      clearInterval(time);
    };
  }, [isAutoSlide, width, length]);
  useEffect(() => {
    updateAnimation();
  }, [width, length]);

  const handlePromise = (
    itemWidth: number
  ): { timeOut: NodeJS.Timeout | any; promise: any } => {
    setIsAutoSlide(false);
    let timeOut = null;
    const promise = new Promise((resolve) => {
      // handle click left btn khi 1 slide o vi tri -length*width  thi se chuyen xuong cuoi slider vi tri (2*length-1) * width con vi tri khc - width translate se o vitri  (2*length-1) * width
      // handle click left btn khi 1 slide o vi tri length*width  thi se chuyen xuong cuoi slider vi tri (-2*length+1) * width con vi tri khc + width translate se o vitri  (-2*length+1) * width
      setAnimation((pre) => {
        if (itemWidth < 0) {
          if (translates[indexMax(translates, true)] >= -length * width) {
            return {
              translateX1:
                pre.translateX1 <= -length * width
                  ? pre.translateX1 + 3 * length * width - width
                  : pre.translateX1 + itemWidth,

              translateX2:
                pre.translateX2 <= -length * width
                  ? pre.translateX2 + 3 * length * width - width
                  : pre.translateX2 + itemWidth,
              translateX3:
                pre.translateX3 <= -length * width
                  ? pre.translateX3 + 3 * length * width - width
                  : pre.translateX3 + itemWidth,
              transition:
                (pre.translateX1 <= -length * width
                  ? pre.translateX1
                  : pre.translateX2 <= -length * width
                  ? pre.translateX2
                  : pre.translateX3) +
                3 * length * width -
                width,
            };
          } else {
            return {
              translateX1:
                indexMax(translates, true) === 0
                  ? pre.translateX1 + 3 * length * width - width
                  : pre.translateX1 + itemWidth,

              translateX2:
                indexMax(translates, true) === 1
                  ? pre.translateX2 + 3 * length * width - width
                  : pre.translateX2 + itemWidth,
              translateX3:
                indexMax(translates, true) === 2
                  ? pre.translateX3 + 3 * length * width - width
                  : pre.translateX3 + itemWidth,
              transition:
                (indexMax(translates, true) === 0
                  ? pre.translateX1
                  : indexMax(translates, true) === 1
                  ? pre.translateX2
                  : pre.translateX3) +
                3 * length * width -
                width,
            };
          }
        } else {
          if (indexMax(translates) > length * width) {
            return {
              translateX1:
                indexMax(translates) === 0
                  ? pre.translateX1 - 3 * length * width + width
                  : pre.translateX1 + itemWidth,

              translateX2:
                indexMax(translates) === 1
                  ? pre.translateX2 - 3 * length * width + width
                  : pre.translateX2 + itemWidth,
              translateX3:
                indexMax(translates) === 2
                  ? pre.translateX3 - 3 * length * width + width
                  : pre.translateX3 + itemWidth,
              transition:
                (indexMax(translates) === 0
                  ? pre.translateX1
                  : indexMax(translates) === 1
                  ? pre.translateX2
                  : pre.translateX3) -
                3 * length * width +
                width,
            };
          } else {
            return {
              translateX1:
                pre.translateX1 >= length * width
                  ? pre.translateX1 - 3 * length * width + width
                  : pre.translateX1 + itemWidth,

              translateX2:
                pre.translateX2 >= length * width
                  ? pre.translateX2 - 3 * length * width + width
                  : pre.translateX2 + itemWidth,
              translateX3:
                pre.translateX3 >= length * width
                  ? pre.translateX3 - 3 * length * width + width
                  : pre.translateX3 + itemWidth,
              transition:
                (pre.translateX1 >= length * width
                  ? pre.translateX1
                  : pre.translateX2 >= length * width
                  ? pre.translateX2
                  : pre.translateX3) -
                3 * length * width +
                width,
            };
          }
        }
      });
      timeOut = setTimeout(() => {
        resolve("");
      }, 1000);
    });
    return {
      timeOut,
      promise,
    };
  };
  const handleEventClickLeftBtn = () => {
    //using a variable isClick useState to check if isClick = true don't anything;
    //set true first time after 1000s will set false on promise then
    if (isClick) return;
    const { timeOut, promise } = handlePromise(-width);
    setIsClick(true);
    promise.then(() => {
      setIsClick(false);
      clearTimeout(timeOut);
    });
  };
  const handleEventClickRightBtn = () => {
    if (isClick) return;
    const { timeOut, promise } = handlePromise(width);
    setIsClick(true);
    promise.then(() => {
      setIsClick(false);
      clearTimeout(timeOut);
    });
  };
  return { animation, handleEventClickLeftBtn, handleEventClickRightBtn };
}
