import { useEffect, useState } from "react";
import { CategoryAPI, fileAPI, url } from "../../../api";
import Navbar from "../Navbar";
import OptionItem from "../Product/OptionItem";
import VendorAdd from "../Vendor/VendorAdd";
import Notify from "../Notify/Notify";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../TextEditor";

export default function CategoryUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>({
    position: 0,
    show: false,
    name: "",
    image: "",
    description: "",
    vendors: [],
    childCategories: [],
  });

  const [notify, setNotify] = useState<{
    isSuccess: boolean;
    value: string;

    handleNavigate?: () => void;
  } | null>(null);

  // ****************************************
  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    setCategory((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleUpdateCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const status = CategoryAPI.update(category)
      .then(() => {
        setNotify({
          value: "Cập nhập danh mục thành công",
          isSuccess: true,
          handleNavigate: () => {
            navigate("/admin/categories");
          },
        });
      })
      .catch(() =>
        setNotify({ value: "Cập nhập thất bại ", isSuccess: false })
      );
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
  // *********************************************************************
  const handleChangeVendor = (
    id: string,
    name: string,
    value: string | boolean
  ) => {
    setCategory((pre) => {
      return {
        ...pre,
        vendors:
          pre.vendors &&
          pre.vendors.map((vendor) => {
            if (vendor.id === id) return { ...vendor, [name]: value };
            return vendor;
          }),
      };
    });
  };
  //************************************************************* */

  const handleAddChildCategory = (title: string, value: string | Category) => {
    if (typeof value === "string") {
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
  //************************************************************** */
  const handleChangeChildCategory = (
    id: string,
    title: string | null,
    name: string,
    value: string | boolean
  ) => {
    if (title === null) {
      if (
        name === "name" &&
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
          childCategories: pre.childCategories
            ? pre.childCategories.map((childCategory) => {
                if (childCategory.id === id)
                  return { ...childCategory, [name]: value };
                return childCategory;
              })
            : [{ [name]: value }],
        }));
      }
    } else {
      if (
        name === "name" &&
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
          childCategories: pre.childCategories?.map((preChild) =>
            preChild.name === title
              ? {
                  ...preChild,
                  childCategories: preChild.childCategories
                    ? preChild.childCategories.map((childCategory) => {
                        if (childCategory.id === id)
                          return { ...childCategory, [name]: value };
                        return childCategory;
                      })
                    : [{ [name]: value }],
                }
              : preChild
          ),
        }));
      }
    }
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
  useEffect(() => {
    if (id)
      CategoryAPI.getById(id)
        .then((data) => {
          setCategory(data);
        })
        .catch(() => {
          navigate("/error");
        });
  }, [id]);
  console.log(category);
  return (
    <div className="overflow-y-auto  vh-100 bg-white">
      {notify !== null && <Notify notify={notify} setNotify={setNotify} />}
      <Navbar title={"Add Category"} />
      <div className="base-info px-4">
        <div className="title-v1 py-3">
          <h5>Thông tin cơ bản</h5>
        </div>
        <div className="mb-3">
          <label htmlFor="floatingInput " className="form-label">
            Tên danh mục:
          </label>
          <input
            type="text"
            value={category.name}
            className="form-control"
            id="name"
            placeholder=""
            onChange={handleChangeCategory}
          />
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="floatingInput " className="form-label">
              Vị trí:
            </label>
            <input
              type="number"
              value={category.position}
              className="form-control"
              id="position"
              placeholder=""
              onChange={handleChangeCategory}
            />
          </div>
          <div className="col-6">
            <div className="form-check">
              <input
                type="checkbox"
                checked={category.show}
                className="form-check-input"
                id="isShow"
                placeholder=""
                onChange={handleChangeCategory}
              />
              <label htmlFor="form-label " className="form-check-label">
                Hiện thị tìm kiếm nhanh
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            onChange={handleChangeFiles}
          />
          <div className="preview mt-3">
            <img src={url + category.image} alt="" />
            <p className="text-center mt-2">{category.image}</p>
          </div>
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
            handleChangeVendor={handleChangeVendor}
          />
        </div>
        <div className="mb-3">
          <OptionItem
            title="Thêm danh mục con:"
            childOptions={category.childCategories as Category[]}
            handleAddChildOption={handleAddChildCategory}
            handleRemoveChildOption={handleRemoveChildCategory}
            handleChangeChildOption={handleChangeChildCategory}
          />
          {category.childCategories &&
            category.childCategories.map((childCategory) => {
              return (
                <VendorAdd
                  vendors={childCategory.childCategories as Category[]}
                  handleAddVendor={(value: Category) => {
                    handleAddChildCategory(childCategory.name, value);
                  }}
                  handleRemoveVendor={(index: number) => {
                    handleRemoveChildCategory(childCategory.name, index);
                  }}
                  handleChangeVendor={(id, name, value) => {
                    handleChangeChildCategory(
                      id,
                      childCategory.name,
                      name,
                      value
                    );
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
            onClick={handleUpdateCategory}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}
