import { useEffect, useRef } from "react";
interface OverlayProps {
  isOpen: boolean;
  handleOpen: () => void;
  className?: string;
}
export default function Overlay({
  isOpen,
  handleOpen,
  className,
}: OverlayProps) {
  const ref = useRef<any>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("click", handleOpen);
    }
  }, []);
  return (
    <div className={`overlay ${isOpen ? "open" : ""} ${className}`} ref={ref}>
      {" "}
    </div>
  );
}
