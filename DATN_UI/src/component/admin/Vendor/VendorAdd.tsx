import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Overlay from "../../Overlay/Overlay";
import { fileAPI, url } from "../../../api";
import { handleChangeFiles } from "../../../untils";
export default function VendorAdd({
  title,
  vendors,
  handleAddVendor,
  handleRemoveVendor,
  handleChangeVendor,
}: {
  title?: string;
  vendors: Vendor[] | Category[];
  handleAddVendor: ((value: Vendor) => void) | ((value: Category) => void);
  handleRemoveVendor: (index: number) => void;
  handleChangeVendor?: (
    id: string,
    name: string,
    value: string | boolean
  ) => void;
}) {
  return (
    <div className="option-item d-flex align-item-center rounded mb-3 p-2">
      <span className="d-block">{title || "Thêm hãng sản xuất :"}</span>
      <ul className="child-option-ls list-type-none clearfix">
        {vendors.map((vendor, index) => {
          return (
            <VendorAddItem
              {...vendor}
              index={index}
              handleRemoveVendor={handleRemoveVendor}
              handleChangeVendor={
                handleChangeVendor ? handleChangeVendor : () => {}
              }
            />
          );
        })}
      </ul>
      <span className="d-block ms-auto text-primary ">
        <AddVendorForm handleAddVendor={handleAddVendor} />
        {!handleChangeVendor && (
          <span className="control-btn">
            <IoClose />
            remove
          </span>
        )}
      </span>
    </div>
  );
}

const VendorAddItem = ({
  id,
  image,
  name,
  show,
  index,
  handleRemoveVendor,
  handleChangeVendor,
}: {
  id?: string;
  image?: string;
  show?: boolean;
  name: string;
  index: number;

  handleRemoveVendor: (index: number) => void;
  handleChangeVendor: (
    id: string,
    name: string,
    value: string | boolean
  ) => void;
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <>
      <li
        className="child-option-it float-start pb-1 ms-2 mb-2 position-relative rounded-pill  pe-4 ps-2"
        onDoubleClick={(e) => {
          setIsShow((pre) => !pre);
        }}
      >
        <img className="img me-3" src={url + image} alt="" />

        {name}
        {!id && (
          <span
            className="icon-close position-absolute top-0  "
            onClick={(e) => {
              e.preventDefault();
              handleRemoveVendor(index);
            }}
          >
            <IoClose />
          </span>
        )}

        {id && (
          <div
            className={`add-child-form p-3 rounded bg-white  position-absolute start-50 top-100 translate-middle-x ${
              isShow ? "d-block" : "d-none"
            }`}
          >
            <form>
              <input
                type="text"
                placeholder="Tên hãng"
                className="border mb-2"
                id="name"
                onChange={(e) => {
                  const name = e.currentTarget.id;
                  const value = e.currentTarget.value;
                  handleChangeVendor(id, name, value);
                }}
                value={name}
              />
              <input
                className="form-control mb-2"
                type="file"
                onChange={(e) => {
                  handleChangeFiles(e, (file) => {
                    handleChangeVendor(id, "image", file);
                  });
                }}
              />
              {typeof show !== "undefined" && (
                <div className="form-check">
                  <input
                    type="checkbox"
                    checked={show}
                    className="form-check-input border"
                    id="show"
                    placeholder=""
                    onChange={(e) => {
                      const name = e.currentTarget.id;
                      const value = e.currentTarget.checked;
                      handleChangeVendor(id, name, value);
                    }}
                  />
                  <label htmlFor="form-label " className="form-check-label">
                    Hiện thị tìm kiếm nhanh
                  </label>
                </div>
              )}
              <div className="preview">
                <img src={url + image} alt="" />
              </div>
            </form>
          </div>
        )}
      </li>
      <Overlay
        className="bg-transparent"
        isOpen={isShow}
        handleOpen={() => setIsShow((pre) => !pre)}
      />
    </>
  );
};
const AddVendorForm = ({
  handleAddVendor,
}: {
  handleAddVendor: ((value: Vendor) => void) | ((value: Category) => void);
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [newVendor, setNewVendor] = useState({
    name: "",
    image: "",
  });
  //********************************************************************* */

  //********************************************************************* */

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddVendor(newVendor);
    setNewVendor({ name: "", image: "" });
  };

  //********************************************************************* */

  return (
    <>
      <span className="control-btn me-3 position-relative">
        <span onClick={() => setIsShow((pre) => !pre)}>
          <BiPlus />
          add child
        </span>
        <div
          className={`add-child-form p-3 rounded bg-white  position-absolute end-100 top-0 ${
            isShow ? "d-block" : "d-none"
          }`}
        >
          <form>
            <input
              type="text"
              placeholder="Tên hãng"
              className="border mb-2"
              onChange={(e) => {
                const name = e.currentTarget.value;
                setNewVendor((pre) => ({
                  ...pre,
                  name: name,
                }));
              }}
              value={newVendor.name}
            />
            <input
              className="form-control mb-2"
              type="file"
              onChange={(e) => {
                handleChangeFiles(e, (file) => {
                  setNewVendor((pre) => ({ ...pre, image: file }));
                });
              }}
            />
            <button
              className="btn btn-outline-primary "
              type="submit"
              onClick={handleSubmit}
            >
              thêm
            </button>
          </form>
        </div>
      </span>
      <Overlay
        className="bg-transparent"
        isOpen={isShow}
        handleOpen={() => setIsShow((pre) => !pre)}
      />
    </>
  );
};
