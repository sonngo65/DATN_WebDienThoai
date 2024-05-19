import { useEffect, useState } from "react";
import Overlay from "../../Overlay/Overlay";

export default function Notify({
  notify,
  setNotify,
}: {
  notify: {
    isSuccess: boolean;
    value: string;

    handleNavigate?: () => void;
  };
  setNotify: React.Dispatch<
    React.SetStateAction<{
      isSuccess: boolean;
      value: string;
    } | null>
  >;
}) {
  const [isShow, setIsShow] = useState<boolean>(true);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (notify.handleNavigate) notify.handleNavigate();
      setIsShow(false);
      setNotify(null);
    }, 2000);
    return () => {
      console.log("clear");
      clearTimeout(timeOut);
    };
  }, []);
  return (
    <>
      <div
        className={`notify position-fixed  ${
          notify.isSuccess ? "success" : "error"
        } end-0 start-0 translate-y-middle ${isShow ? "d-block" : "d-none"}`}
      >
        <h5 className="">{notify.value}</h5>
      </div>
      <Overlay
        isOpen={isShow}
        handleOpen={() => setIsShow((pre) => !pre)}
        className="bg-transparent"
      />
    </>
  );
}
