import { fileAPI } from "./api";

export const handleChangeFiles = (
  e: React.ChangeEvent<HTMLInputElement>,
  handleChangeState: (file: any) => void,
  handlePreView?: (file: any) => void
) => {
  const formData = new FormData();
  const files = e.currentTarget.files;
  if (files && files?.length > 0) {
    if (handlePreView) handlePreView(files[0]);

    formData.append("file", files[0]);
    handleChangeState(files[0].name);
    fileAPI.upload(formData).catch((e) => {
      console.log(e);
    });
  }
};

export const formatMoney = (price: number) => {
  if (!price && price !== 0) return;
  let stringPrice = price.toString();
  let stringPriceArr = stringPrice.split("").reverse();
  let result = "";
  for (let i = 0; i < stringPriceArr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      result += ".";
    }
    result += stringPriceArr[i];
  }
  return result.split("").reverse().join("");
};

export const checkOrderStatus = (status: number) => {
  if (status === 0) return "CHỜ XÁC NHẬN";
  if (status === 1) return "ĐÃ HỦY";
  if (status === 2) return "ĐANG GIA0";
  if (status === 3) return "HOÀN THÀNH";
};
export const renderPagination = (
  totalPages: number,
  handlePagination: (pageNo: number) => void
) => {
  const pagination = [];
  for (let i = 0; i < totalPages; i++) {
    pagination.push(
      <li className="page-item">
        <button className="page-link" onClick={() => handlePagination(i)}>
          {i + 1}
        </button>
      </li>
    );
  }
  return (
    <nav aria-label="...">
      <ul className="pagination pagination-sm">
        {" "}
        {pagination.map((page) => {
          return page;
        })}
      </ul>
    </nav>
  );
};
