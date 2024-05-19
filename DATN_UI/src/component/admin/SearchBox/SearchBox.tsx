import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../api";
import Overlay from "../../Overlay/Overlay";
import { CiSearch } from "react-icons/ci";
import { read } from "fs";

export default function SearchBox({
  readOnly,
  className,
  products,
  handleChange,
  handleAdd,
}: {
  readOnly: boolean;
  className?: string;
  products: any[];
  handleChange: (id: string, flashSale: number) => void;
  handleAdd: (product: any) => void;
}) {
  const [productSearchs, setProductSearchs] = useState<any>([]);

  const [nameSearch, setNameSearch] = useState<string | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const navigate = useNavigate();
  // const handleChange = (price: number | string, id: string) => {
  //   setSelectedProducts((pre: any) => {
  //     return pre.map((product: any) => {
  //       if (product.id === id) return { ...product, flashSalePrice: price };
  //       else return product;
  //     });
  //   });
  // };

  useEffect(() => {
    ProductAPI.getProductsByName("")
      .then((data) => {
        setProductSearchs(
          data.map((value: any) => ({
            ...value,
            isSelected: products.includes(value),
          }))
        );
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);
  return (
    <>
      <Overlay
        isOpen={isShow}
        handleOpen={() => {
          setIsShow((pre) => !pre);
          setNameSearch((pre) => null);
        }}
        className="bg-transparent"
      />
      <div className={`search-box admin position-relative ${className}`}>
        <form
          className="w-100 h-100"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="search-box__input"
            type="text"
            placeholder="Từ khóa ..."
            onChange={(e) => setNameSearch(e.target.value)}
            onFocus={(e) => {
              setNameSearch("");
              setIsShow(true);
            }}
          />
        </form>
        <CiSearch />
        <div
          className={`search-result  position-absolute top-100 end-0 start-0 vh-60 bg-white rounded px-2 ${
            isShow ? "d-block" : "d-none"
          } `}
        >
          {productSearchs
            .filter((product: any) => {
              return (
                !readOnly &&
                !product.isSelected &&
                product.name
                  .toUpperCase()
                  .includes(nameSearch?.toLocaleUpperCase())
              );
            })
            .map((product: any) => {
              return (
                <div
                  key={product.id}
                  onClick={(e) => {
                    setProductSearchs((pre: any) =>
                      pre.map((preProduct: any) => {
                        if (product.id === preProduct.id)
                          return { ...preProduct, isSelected: true };
                        else return preProduct;
                      })
                    );
                    setIsShow(false);
                    setNameSearch(null);
                    handleAdd(product);
                  }}
                  className="search-result-item d-flex text-deco-none py-2 my-2"
                >
                  <div className="img">
                    <img src={product.img} alt="" />
                  </div>
                  <div className="info">
                    <p className="name">{product.name}</p>
                    <p className="price">
                      <span className="color-price">{product.price}</span>
                      <span className="strike">{product.originalPrice}</span>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {products.map((product: any) => {
        return (
          <div className="product-selected-box d-flex align-items-center ">
            <div
              key={product.id}
              className="product-selected  d-flex text-deco-none py-2 my-2"
            >
              <div className="img ">
                <img className="w-100" src={product.img} alt="" />
              </div>
              <div className="info ">
                <p className="name">{product.name}</p>
                <p className="price">
                  <span className="color-price">{product.price}</span>
                  <span className="strike">{product.originalPrice}</span>
                </p>
              </div>
            </div>
            {readOnly ? (
              <input
                readOnly
                type="number"
                className="form-control "
                placeholder="Giá tiền giảm (vd: 3500000)"
                value={product.flashSalePrice}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  handleChange(product.id, Number.parseInt(value));
                }}
              />
            ) : (
              <input
                type="number"
                className="form-control "
                placeholder="Giá tiền giảm (vd: 3500000)"
                value={product.flashSalePrice}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  handleChange(product.id, Number.parseInt(value));
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
