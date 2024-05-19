import { HtmlHTMLAttributes, InputHTMLAttributes, useState } from "react";

interface InputGroupProps {
  label: string;
  name: string;
  className?: string;
}
export default function InputGroup({
  label,
  name,
  className,
}: InputGroupProps) {
  const [text, setText] = useState("");
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div className={`input-group w-100  px-3 ${text !== "" ? "active" : ""}`}>
      <input
        className={"input " + className}
        type="text"
        name={name}
        id={name}
        onChange={handleOnchange}
      />
      <label htmlFor="1">{label}</label>
    </div>
  );
}
