import Banner from "../SlideBanner/Banner";
import { FlashSaleProduct, CategoryOuter } from "../Product";
import { FlashSearch } from "../Search";
import { Footer } from "../Footer";
import CategoryHead from "../Product/component/CategoryHead";
import ProductList from "../Product/component/ProductList";
import ProductSliderList from "../Product/component/ProductSliderList";
import AccessoryList from "../Product/component/AccessoryList";
import FeedbackList from "../Product/component/FeedbackList";
import { useEffect, useState } from "react";
import { CategoryAPI, FeedbackAPI, ProductAPI } from "../../../api";
import { Category } from "../../../model";
import { access } from "fs";
import { useDispatch } from "react-redux";
import * as ActionType from "../../../store/actionTypes";
import { useNavigate } from "react-router-dom";

const CategoryProduct = CategoryOuter({
  Head: CategoryHead,
  Body: ProductList,
});
const CategorySliderProduct = CategoryOuter({
  Head: CategoryHead,
  Body: ProductSliderList,
});
const AccessoryProduct = CategoryOuter({
  Head: CategoryHead,
  Body: AccessoryList,
});
const Feedback = CategoryOuter({
  Head: CategoryHead,
  Body: FeedbackList,
});
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const cateProducts = [
  //   {
  //     img: "/zflip-17390.png",
  //     title: "APPLE AUTHORISED RESELLER",
  //     childCates: [
  //       { id: 1, name: "HONOR" },
  //       { id: 2, name: "iPhone 15" },
  //       { id: 3, name: "TECNO POVA 5" },

  //       { id: 4, name: "Redmi Note 13" },

  //       { id: 5, name: "Samsung Galaxy S24" },
  //     ],
  //     products: [
  //       {
  //         id: 1,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         summary:
  //           "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //         sticker: "/apple.png",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         summary:
  //           "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 13,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         summary:
  //           "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         summary:
  //           "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 13,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         summary:
  //           "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         summary:
  //           "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //     ],
  //   },
  //   {
  //     img: "/hot-chuyen-muc.png",
  //     title: "APPLE AUTHORISED RESELLER",
  //     childCates: [
  //       { id: 1, name: "HONOR" },
  //       { id: 2, name: "iPhone 15" },
  //       { id: 3, name: "TECNO POVA 5" },

  //       { id: 4, name: "Redmi Note 13" },

  //       { id: 5, name: "Samsung Galaxy S24" },
  //     ],
  //     products: [
  //       {
  //         id: 1,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //         sticker: "/apple.png",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 13,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 13,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //     ],
  //   },
  //   {
  //     img: "/hot-chuyen-muc.png",
  //     title: "APPLE AUTHORISED RESELLER",
  //     childCates: [
  //       { id: 1, name: "HONOR" },
  //       { id: 2, name: "iPhone 15" },
  //       { id: 3, name: "TECNO POVA 5" },

  //       { id: 4, name: "Redmi Note 13" },

  //       { id: 5, name: "Samsung Galaxy S24" },
  //     ],
  //     products: [
  //       {
  //         id: 1,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //         sticker: "/apple.png",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 13,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 13,
  //         name: "Vivo V29e - 5G - Chính hãng",
  //         price: 7790000,
  //         compate_price: 8990000,
  //         img: "/xanh-song-bang-6.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //       {
  //         id: 2,
  //         name: "realme C55 - 6GB/128GB - Chính hãng",
  //         price: 4190000,
  //         compate_price: 5990000,
  //         img: "/c55-1-den.webp",
  //         note: "Giảm 20% tối đa 600k khi mở thẻ tín dụng TPBank EVO và thanh toán qua EVO App (Từ 2/3-31/5)",
  //         endow: "giam 10%",
  //       },
  //     ],
  //   },
  // ];
  const [cateProducts, setCateProducts] = useState([]);
  // const accessories = {
  //   img: "/hot-chuyen-muc.png",
  //   title: "PHU KIEN",
  //   accessories: [
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //     { img: "icon-moi-10.webp", name: "Tai nghe" },
  //   ],
  // };
  const [accessories, setAccessories] = useState<any>({
    img: "/hot-chuyen-muc.png",
    title: "Phụ kiện",
    accessories: [],
  });
  // const feedbacks = {
  //   img: "/hot-chuyen-muc.png",
  //   title: "Feed back",
  //   feedbacks: [
  //     {
  //       img: "feedback-img.webp",
  //       name: "DV Trung Ruồi",
  //       field: "Diễn viên",
  //       description:
  //         "Tháng củ mật, lớ ngớ thế nào lại để bị mất điện thoại, may mắn nhờ đại ca Quang Thắng giới thiệu qua Hoàng Hà Mobile, vừa sắm được máy mới sang sịn mịn mà còn với giá cả phải chăng. Từ nay chỉ tin tưởng mua đồ công nghệ ở Hoàng Hà thôi!!",
  //     },
  //     {
  //       img: "feedback-img.webp",
  //       name: "Ngo son",
  //       field: "IT",
  //       description: "rat tot",
  //     },
  //     {
  //       img: "feedback-img.webp",
  //       name: "Ngo son wqe",
  //       field: "IT",
  //       description:
  //         "Tháng củ mật, lớ ngớ thế nào lại để bị mất điện thoại, may mắn nhờ đại ca Quang Thắng giới thiệu qua Hoàng Hà Mobile, vừa sắm được máy mới sang sịn mịn mà còn với giá cả phải chăng. Từ nay chỉ tin tưởng mua đồ công nghệ ở Hoàng Hà thôi!!",
  //     },
  //   ],
  // };
  const [feedbacks, setFeedbacks] = useState<any>({
    img: "/hot-chuyen-muc.png",
    title: "Phản hồi",
    feedbacks: [],
  });
  useEffect(() => {
    dispatch({ type: ActionType.CLEAR_BREADCUMB });
    ProductAPI.getProductsInCategories()
      .then((data) => {
        setCateProducts(data);
      })
      .catch(() => {
        navigate("/error");
      });
    CategoryAPI.getAllChild("b6262e73-5ba5-4c2f-a061-8d053dcfc1ff")
      .then((data) =>
        setAccessories((pre: any) => ({ ...pre, accessories: data }))
      )
      .catch(() => {
        navigate("/error");
      });
    FeedbackAPI.getAll()
      .then((data) => setFeedbacks((pre: any) => ({ ...pre, feedbacks: data })))
      .catch(() => {
        navigate("/error");
      });
  }, []);
  console.log(cateProducts);
  return (
    <div className="body mt-5 pt-5 pt-md-3 ">
      <Banner />

      <div className="container">
        <FlashSearch />
        <FlashSaleProduct />
        {
          <>
            <CategoryProduct {...(cateProducts[0] as Category)} />
            <CategoryProduct {...(cateProducts[1] as Category)} />

            <CategorySliderProduct {...(cateProducts[2] as Category)} />
            <CategorySliderProduct {...(cateProducts[3] as Category)} />
            <CategoryProduct {...(cateProducts[4] as Category)} />

            <CategoryProduct {...(cateProducts[6] as Category)} />
            <CategorySliderProduct {...(cateProducts[7] as Category)} />
            <CategorySliderProduct {...(cateProducts[8] as Category)} />

            <AccessoryProduct {...accessories} />
            <Feedback {...feedbacks} />
          </>
        }
      </div>
    </div>
  );
}
