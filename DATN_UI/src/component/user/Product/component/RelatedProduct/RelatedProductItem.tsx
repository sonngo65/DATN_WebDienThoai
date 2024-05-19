import { FaRegStar } from "react-icons/fa";
import { formatMoney } from "../../../../../untils";
import { Link } from "react-router-dom";
interface RelatedProductItemProps {
  id: string;
  img: string;
  name: string;
  rating: number;
  price: number;
  originalPrice: number;
}
export default function RelatedProductItem({
  id,
  img,
  name,
  rating,
  price,
  originalPrice,
}: RelatedProductItemProps) {
  return (
    <Link to={`/product/${id}`} className="related-product-li">
      <div className="related-product-img">
        <img src={img} alt={name} />
      </div>
      <div className="related-product-info">
        <div className="name">{name}</div>
        <div className="rating">
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </div>
        <div className="price">
          <strong>{formatMoney(price)}</strong>{" "}
          <span className="strike">{formatMoney(originalPrice)}</span>
        </div>
      </div>
    </Link>
  );
}
