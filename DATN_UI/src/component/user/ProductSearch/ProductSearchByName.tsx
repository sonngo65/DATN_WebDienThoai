import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductItem from "../Product/component/ProductItem";
import { ProductAPI } from "../../../api";
import { renderPagination } from "../../../untils";
import { useDispatch } from "react-redux";
import * as ActionType from "../../../store/actionTypes";

export default function ProductSearchByName() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productPage, setProductPage] = useState<any>({
    pageData: [],
    totalPages: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const productName = searchParams.get("name") || "";
  const handlePagination = (pageNo: number) => {
    ProductAPI.getProductsByNameSearch(productName, pageNo.toString())
      .then((data) => setProductPage(data))
      .catch(() => {
        navigate("/error");
      });
  };
  useEffect(() => {
    if (productName || productName === "") {
      ProductAPI.getProductsByNameSearch(productName)
        .then((data) => setProductPage(data))
        .catch(() => {
          navigate("/error");
        });
    }
    dispatch({
      type: ActionType.SET_BREADCUMB,
      payload: [{ name: "Tìm kiếm sản phẩm", url: null }],
    });
  }, [productName]);
  return (
    <div className="pro-search-name my-4 mt-lg-4 pt-lg-0 mt-5 pt-4">
      <div className="container">
        <div className="rounded bg-white p-3">
          <div className="row g-3">
            {productPage.pageData.map((product: any) => {
              return (
                <div className="col-3">
                  {" "}
                  <ProductItem {...product} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-2 d-flex justify-content-center">
          {renderPagination(productPage.totalPages, handlePagination)}
        </div>
      </div>
    </div>
  );
}
