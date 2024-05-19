import Accessory from "./Accessory";
import ChildCate from "./ChildCate";
import Feedback from "./Feedback";
import Product from "./Product";

export default interface Category {
  img?: string;
  title: string;
  childCates?: ChildCate[];
  products?: Product[];
  accessories?: Accessory[];
  feedbacks?: Feedback[];
  className?: string;
}
