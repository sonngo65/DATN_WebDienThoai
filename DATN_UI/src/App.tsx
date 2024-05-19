import "./App.css";
import "./style/index.scss";
import HomePage from "./Page/HomePage";
import CartDetail from "./component/user/Cart/CartDetail";
import Payment from "./component/user/Payment";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductDetail } from "./component/user/ProductDetail";
import ProductSearch from "./component/user/ProductSearch";
import News from "./component/user/News";
import OrderHistory from "./component/user/OrderHistory";
import AdminHome from "./component/admin/Home";
import Home from "./component/user/Home";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducer from "./store/reducer";
import { thunk } from "redux-thunk";
import Test from "./test/Test";
import Dashboard from "./component/admin/Dashboard";
import path from "path";
import {
  ProductAdd,
  ProductView,
  ProductUpdate,
} from "./component/admin/Product";
import {
  CategoryAdd,
  CategoryUpdate,
  CategoryView,
} from "./component/admin/Category";
import OrderView from "./component/admin/Order/OrderView";
import NewsAdd from "./component/admin/News/NewsAdd";
import NewsDetail from "./component/user/News/NewsDetail";
import ProductSearchByName from "./component/user/ProductSearch/ProductSearchByName";
import FlashSale from "./component/admin/FlashSale/FlashSale";
import { AccountView } from "./component/admin/Account";
import { NewsUpdate, NewsView } from "./component/admin/News";
import {
  FeedbackAdd,
  FeedbackUpdate,
  FeedbackView,
} from "./component/admin/Feedback";
import { BannerAdd, BannerUpdate, BannerView } from "./component/admin/Banner";
import ErrorElement from "./ErrorElement";
const router = createBrowserRouter([
  { path: "/error", element: <ErrorElement /> },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <CartDetail />,
      },
      {
        path: "/categories/:id",
        element: <ProductSearch />,
      },
      {
        path: "/categories/:categoryId/vendors/:vendorId",
        element: <ProductSearch />,
      },
      {
        path: "/product/search",
        element: <ProductSearchByName />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/:id",
        element: <NewsDetail />,
      },
      {
        path: "/order",
        element: <OrderHistory />,
      },
    ],
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin/products",
        element: <ProductView />,
      },
      {
        path: "/admin/products/add",
        element: <ProductAdd />,
      },
      {
        path: "/admin/products/update/:id",
        element: <ProductUpdate />,
      },
      {
        path: "/admin/categories",
        element: <CategoryView />,
      },
      {
        path: "/admin/categories/add",
        element: <CategoryAdd />,
      },
      {
        path: "/admin/categories/update/:id",
        element: <CategoryUpdate />,
      },
      {
        path: "/admin/order",
        element: <OrderView />,
      },
      {
        path: "/admin/accounts",
        element: <AccountView />,
      },
      {
        path: "/admin/news",
        element: <NewsView />,
      },
      {
        path: "/admin/news/add",
        element: <NewsAdd />,
      },
      {
        path: "/admin/news/update/:id",
        element: <NewsUpdate />,
      },
      {
        path: "/admin/feedbacks",
        element: <FeedbackView />,
      },
      {
        path: "/admin/feedbacks/add",
        element: <FeedbackAdd />,
      },
      {
        path: "/admin/feedbacks/update/:id",
        element: <FeedbackUpdate />,
      },
      {
        path: "/admin/banners",
        element: <BannerView />,
      },
      {
        path: "/admin/banners/add",
        element: <BannerAdd />,
      },
      {
        path: "/admin/banners/update/:id",
        element: <BannerUpdate />,
      },
      {
        path: "/admin/flash-sale",
        element: <FlashSale />,
      },
    ],
  },
]);
const store = createStore(reducer, applyMiddleware(thunk));
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
