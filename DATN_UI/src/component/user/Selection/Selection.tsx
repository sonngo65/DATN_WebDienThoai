import { useState } from "react";
import Overlay from "../../Overlay/Overlay";
import "./_selection.scss";
import { Option } from "../../../model";
interface SelectionProps {
  top: number;
  options: Option[];
  isShow: boolean;
  setSelection: React.Dispatch<
    React.SetStateAction<{
      top: number;
      isShow: boolean;
    }>
  >;
}

export default function Selection({
  top,
  isShow,
  options,
  setSelection,
}: SelectionProps) {
  return <></>;
}
