import { CiSearch } from "react-icons/ci";
import { ProductAPI } from "../../../api";
import { useEffect, useState } from "react";
import Overlay from "../../Overlay/Overlay";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBox({ className }: { className?: string }) {
  const [products, setProducts] = useState<any>([]);
  const [nameSearch, setNameSearch] = useState<string | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (nameSearch != null) {
      ProductAPI.getProductsByName(nameSearch)
        .then((data) => {
          setProducts(data);
        })
        .catch(() => {
          navigate("/error");
        });
      setIsShow(true);
    }
  }, [nameSearch]);
  return (
    <>
      <Overlay
        isOpen={isShow}
        handleOpen={() => setIsShow((pre) => !pre)}
        className="bg-transparent"
      />
      <div className={`search-box position-relative ${className}`}>
        <form
          className="w-100 h-100"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/product/search?name=" + nameSearch);
          }}
        >
          <input
            className="search-box__input"
            type="text"
            placeholder="Từ khóa ..."
            onChange={(e) => setNameSearch(e.target.value)}
            onFocus={(e) => setNameSearch("")}
          />
        </form>
        <CiSearch />
        <div
          className={`search-result position-absolute top-100 end-0 start-0 vh-60 bg-white rounded px-2 ${
            isShow ? "d-block" : "d-none"
          } `}
        >
          {products.length > 0 && (
            <div className="head p-2 mt-2 rounded">
              {products.length} Sản phẩm
            </div>
          )}
          {products.map((product: any) => {
            return (
              <Link
                key={product.id}
                onClick={(e) => setIsShow(false)}
                to={`/product/${product.id}`}
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
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
