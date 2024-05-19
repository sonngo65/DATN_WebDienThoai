import { Link } from "react-router-dom";
import { ChildCate } from "../../../../model";
interface CategoryHead {
  childCates?: ChildCate[];
  title: string;
}
export default function CategoryHead({ title, childCates }: CategoryHead) {
  return (
    <div className="cate-product__head  mb-4  ">
      <div className="row g-0">
        <div className="cate-product__title col-12 col-lg-5">
          <h5>{title}</h5>
        </div>

        <div className="ps-4 col-lg-7 col-12  mt-3 mt-lg-0 d-flex justify-content-end ">
          <ul className="cate-product__child-cate-ls   list-type-none d-inline-flex  justify-content-start">
            {childCates?.map((childCate) => {
              return (
                <>
                  <li className="cate-product__child-cate-it">
                    <Link
                      to={`/categories/${childCate.id}`}
                      className="cate-product__child-cate-li"
                    >
                      {childCate.name}
                    </Link>
                  </li>{" "}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
