import { useDispatch, useSelector } from "react-redux";
import { AddProduct } from "../store/actionCreators";
import { title } from "process";
export default function Test() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // const fakeData: createProductRequest = {
  //   name: "samsung",
  //   content: "test api",
  //   summary: "test api2",
  //   price: 12312,
  //   originPrice: 21312,
  //   options: [
  //     {
  //       title: "mau sac",
  //       childOptions: [{ name: "do" }, { name: "vang" }],
  //     },
  //     {
  //       title: "phien ban",
  //       childOptions: [{ name: "128gb" }, { name: "64gb" }],
  //     },
  //   ],
  //   optionDetails: [
  //     {
  //       option1: "do",
  //       option2: "128gb",
  //       image: "test1",
  //       price: 12312,
  //       originPrice: 34234,
  //       status: 1,
  //       quantity: 2,
  //     },
  //     {
  //       option1: "vang",
  //       option2: "128gb",
  //       image: "test2",
  //       price: 12312,
  //       originPrice: 34234,
  //       status: 1,
  //       quantity: 2,
  //     },
  //     {
  //       option1: "do",
  //       option2: "64gb",
  //       image: "test3",
  //       price: 12312,
  //       originPrice: 34234,
  //       status: 1,
  //       quantity: 2,
  //     },
  //     {
  //       option1: "vang",
  //       option2: "64gb",
  //       image: "test4",
  //       price: 12312,
  //       originPrice: 34234,
  //       status: 1,
  //       quantity: 2,
  //     },
  //   ],
  // };
  // console.log(state);
  // const handleOnclick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   dispatch(AddProduct(fakeData) as any);
  // };
  return (
    <div>
      <button onClick={() => {}}> Test API</button>
    </div>
  );
}
