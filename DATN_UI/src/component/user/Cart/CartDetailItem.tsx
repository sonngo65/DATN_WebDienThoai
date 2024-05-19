import { FaPlus, FaMinus } from "react-icons/fa";
import { formatMoney } from "../../../untils";

type CartDetailItemProps = {
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, quantity: number) => void;
};
export default function CartDetailItem({
  id,
  image,
  name,
  optionName,
  price,
  status,
  quantity,
  handleDelete,
  handleUpdate,
}: CartResponse & CartDetailItemProps) {
  return (
    <div
      className={`cart-detail-item position-relative ${
        status === 2 ? "disable" : ""
      }`}
    >
      <div className="cart-detail-item-left">
        <div className="cart-detail-item__img">
          <img src={image} alt={name} />
        </div>
        <div className="cart-detail-item__info d-flex flex-column justify-content-between">
          <div>
            <a className="name mb-0">{name}</a>
            <p className="options ">{optionName}</p>
          </div>
          <div className="quantity">
            <span
              className="minus"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(id, quantity - 1);
              }}
            >
              <FaMinus />
            </span>
            <span className="number">{quantity}</span>
            <span
              className="plus"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(id, quantity + 1);
              }}
            >
              <FaPlus />
            </span>
          </div>
        </div>
      </div>
      <div className="cart-detail-item-right">
        <div className="cart-detail-item__price text-nowrap">
          <strong>
            {status === 2 ? "Không đủ hàng" : formatMoney(price) + " ₫"}{" "}
          </strong>
        </div>
        <div className="cart-detail-item__delete">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(id);
            }}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
