import { useEffect, useRef, useState } from "react";
import { Option } from "../../../model";
import { FaArrowDown } from "react-icons/fa";
import Selection from "../Selection";
import Overlay from "../../Overlay/Overlay";
interface SelectInputGroupProps {
  label: string;
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}
export default function SelectInputGroup({
  label,
  options,
  setOptions,
}: SelectInputGroupProps) {
  const [selection, setSelection] = useState({
    top: 0,
    isShow: false,
  });
  const ref1 = useRef<any>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (ref1.current) {
        setSelection((pre) => {
          return {
            ...pre,
            top:
              window.innerHeight - ref1.current.getBoundingClientRect().bottom >
              235
                ? ref1.current.offsetHeight
                : -235,
          };
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  const handleClickSelect = () => {
    setSelection((pre) => {
      return {
        ...pre,
        top:
          window.innerHeight - ref1.current.getBoundingClientRect().bottom > 235
            ? ref1.current.offsetHeight
            : -235,
        isShow: true,
      };
    });
  };
  return (
    <div className="position-relative">
      <div
        className={`input-group w-100  px-3 ${
          options.find((options) => options.isSelected) !== undefined
            ? "active"
            : ""
        }`}
        onClick={handleClickSelect}
        ref={ref1}
      >
        <select name="prv-select" id="select-input" className="d-none">
          {options.map((option) => {
            return (
              <option selected={option.isSelected} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
        <input
          className={`input `}
          type="text"
          readOnly
          value={options.find((option) => option.isSelected)?.name}
        />

        <label htmlFor="1">{label}</label>
        <div className="icon">
          <FaArrowDown />
        </div>
      </div>
      {selection.isShow && (
        <>
          <span
            className={`selection position-absolute  ${
              selection.top < 0 ? "d-flex flex-column-reverse" : ""
            } `}
            style={{
              left: "0px",
              right: "0px",
              top: `${selection.top}px`,
            }}
          >
            <div className="search-box">
              <input type="text" />
            </div>
            <div className="select">
              <ul className="select-ls list-type-none">
                {options.map((option) => {
                  return (
                    <li
                      className={`select-it ${
                        option.isSelected ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelection((pre) => {
                          return { ...pre, isShow: !pre.isShow };
                        });
                        setOptions((pre) => {
                          return pre.map((preOption) => {
                            if (preOption.id === option.id)
                              return { ...preOption, isSelected: true };
                            else return { ...preOption, isSelected: false };
                          });
                        });
                      }}
                    >
                      {option.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </span>
          <Overlay
            className="bg-transparent"
            isOpen={selection.isShow}
            handleOpen={() => {
              setSelection((pre) => {
                return { ...pre, isShow: !pre.isShow };
              });
            }}
          />
        </>
      )}
    </div>
  );
}
