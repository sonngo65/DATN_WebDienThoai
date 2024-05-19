import React from "react";
import { FaCaretRight } from "react-icons/fa";
export default function SliderRightBtn({
  handleEventClick,
  className,
}: {
  handleEventClick: React.MouseEventHandler;
  className?: string;
}) {
  return (
    <div className={`slider-btn right ${className}`}>
      <button onClick={handleEventClick}>
        <FaCaretRight />
      </button>
    </div>
  );
}
