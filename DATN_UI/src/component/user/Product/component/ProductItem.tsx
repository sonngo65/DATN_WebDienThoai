import { Link } from "react-router-dom";
import Product from "../../../../model/Product";
import { format } from "path";
import { formatMoney } from "../../../../untils";
import { IoFlash } from "react-icons/io5";
export default function ProductItem({
  id,
  name,
  img,
  price,
  originalPrice,
  flashSalePrice,
  summary,
  endow,
  sticker,
}: Product) {
  return (
    <div className="product">
      <Link to={`/product/${id}`} className="product__link  position-relative">
        <div className="product__img">
          <img src={img} alt={name} />
        </div>
        <div className="product__info">
          <p>{name}</p>
          <span className="price">
            <strong>{formatMoney(price)} ₫</strong>
            <span className="strike">{formatMoney(originalPrice)} ₫</span>
          </span>
        </div>
        <div className="product__cover">
          <div className="box">{endow}</div>
        </div>
        {flashSalePrice ? (
          <span className="product__sale">
            <IoFlash /> Giảm {formatMoney(flashSalePrice)} ₫
          </span>
        ) : (
          ""
        )}
        {sticker ? (
          <div className="product__sticker">
            <img src={sticker} />
          </div>
        ) : (
          ""
        )}
        <div className="product__note">
          <span className="bag">KM</span>
          <div className="text-start ms-2">
            <label>
              <div dangerouslySetInnerHTML={{ __html: summary }}></div>
            </label>
            {/* <span className="more">Va 2 KM Khac</span> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
