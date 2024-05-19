import { Product } from "../../../../model";
import ProductItem from "./ProductItem";
interface ProductListProps {
  products: Product[];
}
export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="product-ls">
      <div className="row g-2">
        {products.map((product) => {
          return (
            <div className="col-xl-3 col-lg-4  col-sm-6 col-12">
              <ProductItem {...product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
