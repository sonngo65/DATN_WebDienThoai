import CartDetailItem from "./CartDetailItem";

type CartDetailListProps = {
  carts: CartResponse[];
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, quantity: number) => void;
};
export default function CartDetailList({
  carts,
  handleDelete,
  handleUpdate,
}: CartDetailListProps) {
  return (
    <ul className="cart-detail-list list-type-none">
      {carts.map((cartDetail) => {
        return (
          cartDetail.id !== "" && (
            <li className="mt-2">
              <CartDetailItem
                {...cartDetail}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            </li>
          )
        );
      })}
    </ul>
  );
}
