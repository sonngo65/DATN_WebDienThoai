import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import TextEditor from "../TextEditor";
import OptionItem from "./OptionItem";
import OptionDetailItem from "./OptionDetailItem";
import Notify from "../Notify/Notify";
import * as actionCreators from "../../../store/actionCreators";
import * as CategoryAPI from "../../../api/categoryAPI";
import { useDispatch } from "react-redux";
import Select, { MultiValue } from "react-select";
import { ProductAPI, VendorAPI } from "../../../api";
import { handleChangeFiles } from "../../../untils";
import { useNavigate } from "react-router-dom";
import { url } from "inspector";
export default function ProductAdd() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<createProductRequest>({
    name: "",
    content: "",
    summary: "",
    specification: "",
    price: 0,
    originalPrice: 0,
    isBestSeller: false,
    img: "",
    options: [],
    optionDetails: [],
    parentCategoryId: "",
    childCategoryId: [],
    vendorId: "",
  });
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
    handleNavigate?: () => void;
  } | null>(null);
  const [newOption, setNewOption] = useState<string>("");
  const [selects, setSelects] = useState<{
    categorySelect: { value?: string; label?: string }[] | [];
    childCategorySelect: { value?: string; label?: string }[] | [];
    vendorSelect: { value?: string; label?: string }[] | [];
  }>({
    categorySelect: [],
    childCategorySelect: [],
    vendorSelect: [],
  });
  const resetFileInput = () => Math.random().toString(36);
  const [fileKey, setFileKey] = useState<any>(["1", "2"]);

  //******************************************************************** */
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ProductAPI.post(product)
      .then(() => {
        SetNotify({
          value: "Thêm sản phẩm thành công",
          isSuccess: true,
        });
      })
      .catch(() => navigate("/error"));

    setProduct({
      name: "",
      content: "",
      summary: "",
      price: 0,
      originalPrice: 0,
      isBestSeller: false,
      img: "",
      options: [],
      optionDetails: [],
      parentCategoryId: "",
      childCategoryId: [],
      vendorId: "",
    });
    setFileKey([resetFileInput(), resetFileInput()]);
  };
  // *********************************************************************

  const handleChangeProduct = (
    name: string,
    value: string | number | boolean
  ) => {
    setProduct((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  // *********************************************************************

  const handleRemoveChildOption = (title: string, index: number) => {
    setProduct((pre) => {
      return {
        ...pre,
        options: pre.options.map((preOption: Option) =>
          preOption.title === title
            ? {
                ...preOption,
                childOptions: preOption.childOptions.filter(
                  (childOption, i) => i !== index
                ),
              }
            : preOption
        ),
      };
    });
  };

  // *********************************************************************
  const handleAddChildOption = (title: string, value: string) => {
    if (
      product.options
        .find((option) => option.title === title)
        ?.childOptions.find((childOption) => childOption.name === value)
    ) {
      SetNotify({ value: `option ${value} is exists`, isSuccess: false });
    } else {
      setProduct((pre) => {
        return {
          ...pre,
          options: pre.options.map((preOption: Option) =>
            preOption.title === title
              ? {
                  ...preOption,
                  childOptions: [...preOption.childOptions, { name: value }],
                }
              : preOption
          ),
        };
      });
    }
  };

  // *********************************************************************
  const handleChangeOptionDetail = (
    option1: string,
    option2: string,
    name: string,
    value: string | number
  ) => {
    setProduct((preProduct) => {
      return {
        ...preProduct,
        optionDetails: preProduct.optionDetails.map((optionDetail) => {
          if (
            optionDetail.option1 === option1 &&
            optionDetail.option2 === option2
          )
            return { ...optionDetail, [name]: value };
          return optionDetail;
        }),
      };
    });
  };
  // *********************************************************************

  let arr = Array(product.options.length);
  const generateOptionDetails = useCallback(
    (length: number, optionDetails: OptionDetail[]) => {
      if (length < 0) {
        optionDetails.push({
          option1: arr[0],
          option2: arr[1] === undefined ? null : arr[1],
          image: "",
          price: 0,
          originalPrice: 0,
          quantity: 0,
          status: 0,
        });
      } else {
        (product as createProductRequest).options[length].childOptions.forEach(
          (childOption, index) => {
            arr[length] = childOption.name;
            if (length >= 0) {
              generateOptionDetails(length - 1, optionDetails);
            }
          }
        );
      }
    },
    [product.options]
  );

  // *********************************************************************

  useEffect(() => {
    let optionDetails: OptionDetail[] = [];
    if (product.options.length > 0) {
      generateOptionDetails(product.options.length - 1, optionDetails);
      setProduct((pre) => {
        return {
          ...pre,
          optionDetails: optionDetails,
        };
      });
    }
  }, [product.options]);

  // *********************************************************************

  useEffect(() => {
    CategoryAPI.getAll()
      .then((data) => {
        setSelects((pre) => ({
          ...pre,
          categorySelect: data.map((category: any) => ({
            value: category.id,
            label: category.name,
          })),
        }));
        setProduct((pre) => ({ ...pre, parentCategoryId: data[0].id }));
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);
  useEffect(() => {
    if (product.parentCategoryId === "") return;
    CategoryAPI.getAllChild(product.parentCategoryId)
      .then((data) => {
        setSelects((pre) => ({
          ...pre,
          childCategorySelect: data.map((category: any) => ({
            value: category.id,
            label: category.name,
          })),
        }));
      })
      .catch(() => {
        navigate("/error");
      });
    VendorAPI.getAllByCategory(product.parentCategoryId)
      .then((data) => {
        setSelects((pre) => ({
          ...pre,
          vendorSelect: data.map((category: any) => ({
            value: category.id,
            label: category.name,
          })),
        }));
      })
      .catch(() => {
        navigate("/error");
      });
  }, [product.parentCategoryId]);
  // *********************************************************************
  console.log(product);
  return (
    <div className="overflow-y-auto vh-100 bg-white">
      {notify && <Notify notify={notify} setNotify={SetNotify} />}
      <Navbar title={"Update Product"} />
      <div className="base-info px-4">
        <div className="title-v1 py-3">
          <h5>Thông tin cơ bản</h5>
        </div>
        <form action="#">
          <div className=" mb-3">
            <label htmlFor="floatingInput " className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="text"
              id="name"
              value={product.name}
              className="form-control"
              placeholder=""
              onChange={(e) =>
                handleChangeProduct(e.currentTarget.id, e.currentTarget.value)
              }
            />
          </div>{" "}
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="" className="form-label">
                Danh mục
              </label>

              <Select
                name="category"
                options={selects.categorySelect}
                value={selects.categorySelect.filter(
                  (category: any) => category.value === product.parentCategoryId
                )}
                onChange={(category) => {
                  if (category?.value) {
                    let value: string = category.value;
                    setProduct((pre) => ({ ...pre, parentCategoryId: value }));
                  }
                }}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="col-6">
              <div>
                <label htmlFor="" className="form-label">
                  Nhà cung cấp
                </label>
                <Select
                  required
                  name="category"
                  value={selects.vendorSelect.filter(
                    (vendor) => vendor.value === product.vendorId
                  )}
                  options={selects.vendorSelect}
                  onChange={(vendor) => {
                    if (vendor?.value) {
                      let value: string = vendor.value;
                      setProduct((pre) => ({ ...pre, vendorId: value }));
                    }
                  }}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Danh mục con
            </label>

            <Select
              isMulti={true}
              name="category"
              value={selects.childCategorySelect.filter(
                (childCategory: any) => {
                  return product.childCategoryId.find(
                    (childId) => childId === childCategory.value
                  );
                }
              )}
              options={selects.childCategorySelect}
              onChange={(childCategories) => {
                const data = (
                  childCategories as Array<{
                    value: string;
                    label: string;
                  }>
                ).map((option) => option.value);

                setProduct((pre) => ({ ...pre, childCategoryId: data }));
              }}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Ảnh
              </label>
              <input
                type="file"
                className="form-control"
                key={fileKey[0]}
                onChange={(e) => {
                  handleChangeFiles(
                    e,
                    (file) => {
                      setProduct((pre) => ({ ...pre, img: file }));
                    },
                    (file) => {
                      setProduct((pre) => ({
                        ...pre,
                        imagePreview: URL.createObjectURL(file),
                      }));
                    }
                  );
                }}
              />
              <div className="preview">
                <img src={product.imagePreview} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Gía</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={product.price}
                onChange={(e) =>
                  handleChangeProduct(e.currentTarget.id, e.currentTarget.value)
                }
              />
            </div>
            <div className="col-4">
              <label className="form-label">Giá gốc</label>

              <input
                type="number"
                id="originalPrice"
                className="form-control"
                value={product.originalPrice}
                onChange={(e) =>
                  handleChangeProduct(e.currentTarget.id, e.currentTarget.value)
                }
              />
            </div>
            <div className="col-4">
              <div className=" form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={product.isBestSeller}
                  id="isBestSeller"
                  onChange={(e) => {
                    handleChangeProduct(
                      e.currentTarget.id,
                      e.currentTarget.checked
                    );
                  }}
                />
                <label htmlFor="" className="form-check-label">
                  Sản phẩm bán chạy
                </label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="floatingInput " className="form-label">
              Thông số kỹ thuật
            </label>
            <TextEditor
              id="specification"
              value={product.specification}
              onChange={handleChangeProduct}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="floatingInput " className="form-label">
              Tóm tắt
            </label>
            <TextEditor
              id="summary"
              value={product.summary}
              onChange={handleChangeProduct}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="floatingInput " className="form-label">
              Mô tả
            </label>
            <TextEditor
              id="content"
              value={product.content}
              onChange={handleChangeProduct}
            />
          </div>
          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="endow" className="form-label">
                Nhập ưu đãi:
              </label>
              <input
                type="text"
                id="endow"
                className="form-control"
                value={product.endow}
                onChange={(e) => {
                  const name = e.currentTarget.id;
                  const value = e.currentTarget.value;
                  handleChangeProduct(name, value);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="sticker" className="form-lable">
              Nhập sticker:
            </label>
            <input
              type="file"
              key={fileKey[1]}
              className="form-control"
              id="sticker"
              onChange={(e) => {
                handleChangeFiles(
                  e,
                  (file) => {
                    handleChangeProduct("sticker", file);
                  },
                  (file) => {
                    setProduct((pre) => ({
                      ...pre,
                      stickerPreview: URL.createObjectURL(file),
                    }));
                  }
                );
              }}
            />
            <div className="preview">
              <img src={product.stickerPreview} />
            </div>
          </div>
        </form>
      </div>
      <div className="option-info px-4">
        <div className="title-v1 py-3">
          <h5>Thêm option</h5>
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-6">
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  setProduct((pre) => {
                    return {
                      ...pre,
                      options: [
                        ...pre.options,
                        { title: newOption, childOptions: [] },
                      ],
                    };
                  });
                  setNewOption("");
                }}
              >
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="options"
                    onChange={(e) => {
                      setNewOption(e.currentTarget.value);
                    }}
                    value={newOption}
                  />
                  <label htmlFor="options">them option</label>
                </div>
              </form>
            </div>
          </div>
        </div>
        {product.options.map((option) => (
          <OptionItem
            {...option}
            handleAddChildOption={handleAddChildOption}
            handleRemoveChildOption={handleRemoveChildOption}
          />
        ))}
      </div>
      <div className="option-detail px-4">
        <div className="title-v1 py-3">
          <h5>Chi tiet cac option</h5>
        </div>
        {product.optionDetails.map((optionDetail) => {
          return (
            <OptionDetailItem
              option1={optionDetail.option1 as string}
              option2={optionDetail.option2 as string}
              previewImage={optionDetail.imagePreview}
              handleChangeOptionDetail={handleChangeOptionDetail}
            />
          );
        })}
        <ul className="option-detail-ls list-type-none">
          <div className="text-end my-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-outline-primary px-5"
            >
              Thêm
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}

const CategorySelector = ({
  onChange,
}: {
  onChange: (name: string, value: string) => void;
}) => {
  const [categories, setCategoies] = useState<Category[] | []>([]);

  useEffect(() => {
    CategoryAPI.getAll().then((data) => {
      setCategoies(data);
    });
  }, []);
  return (
    <div>
      <label htmlFor="" className="form-label">
        Danh mục
      </label>

      <Select
        isMulti={true}
        name="category"
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};
