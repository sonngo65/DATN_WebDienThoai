import { useEffect, useRef, useState } from "react";
import { IoChatbox, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { SlArrowUp } from "react-icons/sl";
import { handleChangeFiles } from "../../../untils";

export default function FixScreen() {
  const ref = useRef<any>(null);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY >= 500) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);
  return (
    <>
      <div className="fix-screen  p-1 p-lg-2 pt-lg-3 pb-lg-3 d-flex flex-column">
        <a
          className="mt-lg-1 ml-1 mb-lg-1 mr-1 ml-lg-0 mr-lg-0 chat-box d-flex align-items-center justify-content-center"
          href="#"
        >
          <IoChatbox />
        </a>
        <a
          className="mt-lg-1 ml-1 mb-lg-1 mr-1 ml-lg-0 mr-lg-0 phone-box d-flex align-items-center justify-content-center"
          href=""
        >
          <LuPhoneCall />
        </a>
        <a
          className="mt-lg-1 ml-1 mb-lg-1 mr-1 ml-lg-0 mr-lg-0 phone-box d-flex align-items-center justify-content-center"
          href=""
        >
          <LuPhoneCall />
        </a>
        <a
          className="mt-lg-1 ml-1 mb-lg-1 mr-1 ml-lg-0 mr-lg-0 phone-box d-flex align-items-center justify-content-center"
          href=""
        >
          <LuPhoneCall />
        </a>
      </div>
      <div
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        ref={ref}
        className={`back-top d-flex position-fixed justify-content-center align-items-center  ${
          isShow ? "back-show" : ""
        }  `}
      >
        <SlArrowUp />
      </div>
    </>
  );
}
