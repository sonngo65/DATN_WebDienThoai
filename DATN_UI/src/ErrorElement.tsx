import { Link, useRouteError } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div>
      <p>Đã xảy ra lỗi vui lòng thử lại !</p>
      <Link to="/">Quay lại trang chủ</Link>
    </div>
  );
};
export default ErrorElement;
