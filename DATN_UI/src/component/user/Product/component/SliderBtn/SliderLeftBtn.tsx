import React from "react";
import { FaCaretLeft } from "react-icons/fa";

export default function SliderLeftBtn({
  handleEventClick,
  className,
}: {
  handleEventClick: React.MouseEventHandler;
  className?: string;
}) {
  return (
    <div className={`slider-btn left ${className}`}>
      <button onClick={handleEventClick}>
        <FaCaretLeft />
      </button>
    </div>
  );
}
