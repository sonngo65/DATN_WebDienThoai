import { useState } from "react";
import { IconType } from "react-icons";
import { IoMailOutline } from "react-icons/io5";
import { JsxElement } from "typescript";
import Overlay from "../Overlay/Overlay";
interface Dropdown {
  children: string | JSX.Element | JSX.Element[];
  Icon: IconType;
}
export default function Dropdown({ children, Icon }: Dropdown) {
  const [isShow, setIsShow] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsShow((pre) => !pre);
  };
  return (
    <>
      <a
        className="nav-link p-0 "
        onClick={handleClick}
        data-toggle="dropdown"
        href="#"
      >
        <Icon />
        <span className="position-absolute top-0 start-100 translate-middle  rounded-circle p-1 border border-light bg-danger"></span>
      </a>
      <div
        className={`dropdown-menu dropdown-menu-lg dropdown-menu-right position-absolute top-100 end-0 ${
          isShow ? "show" : ""
        }`}
      >
        {children}
      </div>
      <Overlay
        isOpen={isShow}
        handleOpen={() => {
          setIsShow((pre) => !pre);
        }}
        className="bg-transparent"
      />
    </>
  );
}
