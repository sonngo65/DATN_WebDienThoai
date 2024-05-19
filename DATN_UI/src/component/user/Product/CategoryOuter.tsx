import { access } from "fs";
import {
  Accessory,
  Category,
  ChildCate,
  Feedback,
  Product,
} from "../../../model";
import React from "react";
interface CategoryOuterProps {
  Head: React.FC<{ title: string; childCates?: ChildCate[] }>;
  Body:
    | React.FC<{ products: Product[]; className?: string }>
    | React.FC<{ accessories: Accessory[] }>
    | React.FC<{ feedbacks: Feedback[] }>;
}

export default function CategoryOuter({ Head, Body }: CategoryOuterProps) {
  return ({
    img,
    title,
    childCates,
    products,
    accessories,
    feedbacks,
    className,
  }: Category) => {
    const HeadProps = { title, childCates };
    return (
      <div className=" mt-4">
        <div className="mb-4">
          {img && <img src={img} alt="alt" style={{ width: "100%" }} />}
        </div>
        <Head {...HeadProps} />
        {products && (
          <Body
            products={products ? products : []}
            accessories={[]}
            feedbacks={[]}
            className={className}
          />
        )}
        {accessories && (
          <Body
            accessories={accessories ? accessories : []}
            products={[]}
            feedbacks={[]}
          />
        )}
        {feedbacks && (
          <Body
            feedbacks={feedbacks ? feedbacks : []}
            products={[]}
            accessories={[]}
          />
        )}
      </div>
    );
  };
}
