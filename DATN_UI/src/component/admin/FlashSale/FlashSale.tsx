import { useEffect, useRef, useState } from "react";
import Notify from "../Notify/Notify";
import Navbar from "../Navbar";
import SearchBox from "../SearchBox/SearchBox";
import { ProductAPI } from "../../../api";
import { format } from "path";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function FlashSale() {
  const navigate = useNavigate();
  const [notify, SetNotify] = useState<{
    isSuccess: boolean;
    value: string;
  } | null>(null);

  const [flashSale, setFalshSale] = useState<{
    id?: string;
    endTime: any;
    products: any[];
  }>({ endTime: null, products: [] });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ProductAPI.addProductToFlashSale(flashSale)
      .then((data) => setFalshSale(data))
      .catch(() => {
        navigate("/error");
      });
  };
  const handleDeleteSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    setFalshSale({ endTime: null, products: [] });
    ProductAPI.deleteProductFromFlashSale().catch(() => {
      navigate("/error");
    });
  };
  const handleAdd = (product: any) => {
    setFalshSale((pre) => ({ ...pre, products: [...pre.products, product] }));
  };
  const handleChange = (id: string, flashPrice: number) => {
    setFalshSale((pre) => {
      return {
        ...pre,
        products: pre.products.map((preProduct) => {
          if (id === preProduct.id)
            return { ...preProduct, flashSalePrice: flashPrice };
          return preProduct;
        }),
      };
    });
  };
  useEffect(() => {
    ProductAPI.getAllFlashSaleProducts()
      .then((data) => {
        if (!data) return;
        setFalshSale(data);
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);
  console.log(flashSale);
  return (
    <div className="overflow-y-auto vh-100 bg-white">
      {notify && <Notify notify={notify} setNotify={SetNotify} />}
      <Navbar title={"Quản lý flash sale"} />
      <form onSubmit={handleAddSubmit}>
        <div className="base-info px-4">
          <div className="title-v1 py-3">
            <h5>Thông tin cơ bản</h5>
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Thời gian kết thúc</label>
            {!flashSale.id ? (
              <input
                required={true}
                type="datetime-local"
                className="form-control"
                placeholder="date"
                value={flashSale.endTime}
                onChange={(e) =>
                  setFalshSale((pre) => {
                    return { ...pre, endTime: e.target.value };
                  })
                }
              />
            ) : (
              <p>{formatDate(flashSale.endTime, "dd/MM/yyyy HH:mm")}</p>
            )}
          </div>
          <SearchBox
            readOnly={flashSale.id !== undefined}
            className="w-50 border m-0"
            products={flashSale.products}
            handleChange={handleChange}
            handleAdd={handleAdd}
          />
        </div>
        <div className="text-end my-5 px-4">
          {!flashSale.id ? (
            <button
              type="submit"
              className="btn btn-outline-primary px-5"
              // onClick={handleAddSubmit}
            >
              ADD
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-outline-primary px-5"
              onClick={handleDeleteSubmit}
            >
              HỦy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
