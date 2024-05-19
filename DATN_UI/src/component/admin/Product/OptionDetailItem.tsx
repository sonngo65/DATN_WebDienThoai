import { HtmlHTMLAttributes, useState } from "react";
import * as fileAPI from "../../../api/fileAPI";
import { handleChangeFiles } from "../../../untils";
import { url } from "../../../api";
export default function OptionDetailItem({
  option1,
  option2,
  price,
  originalPrice,
  quantity,
  image,
  previewImage,
  handleChangeOptionDetail,
}: {
  option1: string;
  option2: string;
  price?: number;
  originalPrice?: number;
  quantity?: number;
  image?: string;
  previewImage?: string;

  handleChangeOptionDetail: (
    option1: string,
    option2: string,
    name: string,
    value: string | number
  ) => void;
}) {
  //******************************************************** *
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    handleChangeOptionDetail(option1, option2, name, value);
  };

  //********************************************************** */

  return (
    <li className="option-detail-it mb-2 rounded bg-white p-2 d-flex justify-content-around align-items-center">
      <span className="option-name me-4">
        {option1} / {option2}
      </span>
      <div className="form-floating me-2">
        <input
          type="number"
          value={price}
          className="form-control"
          id="price"
          placeholder="1"
          onChange={handleChange}
        />
        <label htmlFor="1">Price</label>
      </div>
      <div className="form-floating me-2">
        <input
          type="number"
          value={originalPrice}
          className="form-control"
          id="originalPrice"
          placeholder="1"
          onChange={handleChange}
        />
        <label htmlFor="1">Origin Price</label>
      </div>
      <div className="form-floating me-2">
        <input
          type="number"
          value={quantity}
          className="form-control"
          id="quantity"
          placeholder="1"
          onChange={handleChange}
        />
        <label htmlFor="1">Quantity</label>
      </div>
      <div className="option-image d-flex justify-content-start align-items-center me-2">
        <label htmlFor="" className="form-label">
          Image
        </label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => {
            handleChangeFiles(
              e,
              (file) => {
                handleChangeOptionDetail(option1, option2, "image", file);
              },
              (file) => {
                handleChangeOptionDetail(
                  option1,
                  option2,
                  "imagePreview",
                  URL.createObjectURL(file)
                );
              }
            );
          }}
        />
        <div className="preview ms-2" style={{ width: "130px" }}>
          <img
            src={previewImage ? previewImage : image}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </li>
  );
}
