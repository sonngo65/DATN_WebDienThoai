import { useState } from "react";
import { CategoryAPI, fileAPI } from "../../../api";
import Navbar from "../Navbar";
import OptionItem from "../Product/OptionItem";
import VendorAdd from "../Vendor/VendorAdd";
import Notify from "../Notify/Notify";
import { useNavigate } from "react-router-dom";
import TextEditor from "../TextEditor";

export default function CategoryAdd() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>({
    name: "",
    vendors: [],
    description: "",
    childCategories: [],
  });

  const [notify, setNotify] = useState<{
    isSuccess: boolean;
    value: string;
  } | null>(null);
  const resetFileInput = () => Math.random().toString(36);
  const [fileKey, setFileKey] = useState<string>("");
  // ****************************************
  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    setCategory((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleAddCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const status = CategoryAPI.post(category).catch(() => {
      navigate("/error");
    });
    setNotify({ value: "Thêm danh mục thành công", isSuccess: true });
    setCategory({ name: "", vendors: [], childCategories: [] });
    setFileKey(resetFileInput());
  };
  // *********************************************************************

  const handleRemoveVendor = (index: number) => {
    setCategory((pre) => {
      return {
        ...pre,
        vendors: pre.vendors
          ? pre.vendors.filter((value, i) => i !== index)
          : pre.vendors,
      };
    });
  };

  // *********************************************************************
  const handleAddVendor = (value: Vendor) => {
    if (
      category.vendors &&
      category.vendors.find((vendor) => vendor.name === value.name)
    ) {
      setNotify({
        value: `Hãng sản xuất ${value.name} đã tồn tại`,
        isSuccess: false,
      });
    } else {
      setCategory((pre) => {
        return {
          ...pre,
          vendors: [...(pre.vendors as Vendor[]), value],
        };
      });
    }
  };

  //************************************************************* */

  const handleAddChildCategory = (title: string, value: string | Category) => {
    if (typeof value === "string") {
      if (
        category.childCategories &&
        category.childCategories.find((category) => category.name === title)
      ) {
        setCategory((pre) => ({
          ...pre,
          childCategories: pre.childCategories?.map((preChild) =>
            preChild.name === title
              ? {
                  ...preChild,
                  childCategories: [
                    { name: value },
                    ...(preChild.childCategories as Category[]),
                  ],
                }
              : preChild
          ),
        }));
        return;
      }

      if (
        category.childCategories &&
        category.childCategories.find((category) => category.name === value)
      ) {
        setNotify({
          value: `Danh mục con ${value} đã tồn tại`,
          isSuccess: false,
        });
      } else {
        setCategory((pre) => ({
          ...pre,
          childCategories: [
            ...(pre.childCategories as Category[]),
            { name: value, childCategories: [] },
          ],
        }));
      }
    } else {
      if (
        category.childCategories &&
        category.childCategories.find((category) => category.name === title)
      ) {
        setCategory((pre) => ({
          ...pre,
          childCategories: pre.childCategories?.map((preChild) =>
            preChild.name === title
              ? {
                  ...preChild,
                  childCategories: [
                    value,
                    ...(preChild.childCategories as Category[]),
                  ],
                }
              : preChild
          ),
        }));
        return;
      }

      if (
        category.childCategories &&
        category.childCategories.find(
          (category) => category.name === value.name
        )
      ) {
        setNotify({
          value: `Danh mục con ${value} đã tồn tại`,
          isSuccess: false,
        });
      } else {
        setCategory((pre) => ({
          ...pre,
          childCategories: [
            ...(pre.childCategories as Category[]),
            { ...value, childCategories: [] },
          ],
        }));
      }
    }
  };

  //************************************************************* */

  const handleRemoveChildCategory = (title: string, index: number) => {
    setCategory((pre) => {
      return {
        ...pre,
        childCategories:
          pre.childCategories &&
          pre.childCategories.filter((value, i) => i !== index),
      };
    });
  };
  //************************************************************* */

  const handleChangeFiles = (e: React.FormEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const files = e.currentTarget.files;
    if (files !== null) {
      formData.append("file", files[0]);
      setCategory((pre) => ({ ...pre, image: files[0].name }));
      fileAPI.upload(formData).catch((e) => {
        console.log(e);
      });
    }
  };
  console.log(category);
  return (
    <div className="overflow-y-auto vh-100 bg-white">
      {notify !== null && <Notify notify={notify} setNotify={setNotify} />}
      <Navbar title={"Add Category"} />
      <div className="base-info px-4">
        <div className="title-v1 py-3">
          <h5>Thông tin cơ bản</h5>
        </div>
        <div className=" mb-3">
          <label htmlFor="floatingInput " className="form-label">
            Tên danh mục:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={category.name}
            placeholder=""
            onChange={handleChangeCategory}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Image
          </label>
          <input
            type="file"
            key={fileKey}
            className="form-control"
            onChange={handleChangeFiles}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="floatingInput " className="form-label">
            Mô tả
          </label>
          <TextEditor
            value={category.description}
            id="description"
            onChange={(name: string, value: string | number) => {
              setCategory((pre) => ({
                ...pre,
                [name]: value,
              }));
            }}
          />
        </div>
        <div className="mb-3">
          <VendorAdd
            vendors={category.vendors as Vendor[]}
            handleAddVendor={handleAddVendor}
            handleRemoveVendor={handleRemoveVendor}
          />
        </div>
        <div className="mb-3">
          <OptionItem
            title="Thêm danh mục con:"
            childOptions={category.childCategories as Category[]}
            handleAddChildOption={handleAddChildCategory}
            handleRemoveChildOption={handleRemoveChildCategory}
          />
          {category.childCategories &&
            category.childCategories.map((childCategory) => {
              return (
                <VendorAdd
                  title={childCategory.name}
                  vendors={childCategory.childCategories as Category[]}
                  handleAddVendor={(value: Category) => {
                    handleAddChildCategory(childCategory.name, value);
                  }}
                  handleRemoveVendor={(index: number) => {
                    handleRemoveChildCategory(childCategory.name, index);
                  }}
                />
                // <OptionItem
                //   title={childCategory.name}
                //   childOptions={childCategory.childCategories as Category[]}
                //   handleAddChildOption={handleAddChildCategory}
                //   handleRemoveChildOption={handleRemoveChildCategory}
                // />
              );
            })}
        </div>
        <div className="text-end my-5">
          <button
            className="btn btn-outline-primary px-5"
            onClick={handleAddCategory}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
