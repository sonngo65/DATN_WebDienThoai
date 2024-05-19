import { Outlet } from "react-router-dom";
import { Footer } from "../component/user/Footer";
import Header from "../component/user/Header";
import Home from "../component/user/Home";
export default function HomePage() {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Home /> */}
      <Footer />
    </div>
  );
}
