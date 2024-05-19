import { GrCart } from "react-icons/gr";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdCurrencyExchange } from "react-icons/md";
import { url } from "../../../api";
export default function Footer() {
  return (
    <div className="footer mt-5">
      <div className="footer__head">
        <div className="container">
          <ul className="footer__head-ls  row list-type-none justify-content-around align-items-center">
            <li className="footer__head-it mt-2 mt-md-0 col-12 col-md-6 col-lg-3 d-flex justify-content-around align-items-center">
              <div>
                <MdCurrencyExchange />
              </div>
              <div className="d-flex flex-column ms-2">
                <span className="d-block">Sản phẩm</span>
                <strong className="d-block">CHÍNH HÃNG</strong>
              </div>
            </li>
            <li className="footer__head-it mt-2 mt-md-0 col-12 col-md-6 col-lg-3 d-flex justify-content-around align-items-center">
              <div>
                <GrCart />
              </div>
              <div className="d-flex flex-column ms-2">
                <span className="d-block">Sản phẩm</span>
                <strong className="d-block">CHÍNH HÃNG</strong>
              </div>
            </li>
            <li className="footer__head-it mt-2 mt-md-0 col-12 col-md-6 col-lg-3 d-flex justify-content-around align-items-center">
              <div>
                <TfiHeadphoneAlt />
              </div>
              <div className="d-flex flex-column ms-2">
                <span className="d-block">Sản phẩm</span>
                <strong className="d-block">CHÍNH HÃNG</strong>
              </div>
            </li>
            <li className="footer__head-it mt-2 mt-md-0 col-12 col-md-6 col-lg-3 d-flex justify-content-around align-items-center">
              <div>
                <IoMdCheckmarkCircleOutline />
              </div>
              <div className="d-flex flex-column ms-2">
                <span className="d-block">Sản phẩm</span>
                <strong className="d-block">CHÍNH HÃNG</strong>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__body">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="logo">
                <img src={url + "logo5.png"} className="wd-1" />
              </div>
              <br />
              <br />
              <strong>Điện thoại hỗ trợ:</strong>
              <p>Hotline: 0879896115</p>
              <p>
                <b>Email:</b> ssngotat@gmail.com
              </p>
              <p>
                <b>Hotline:</b> 0567.10.7979
              </p>
              <p>HKD Phụ Kiện Hiện Đại: Đại học công nghiệp hà nội</p>
            </div>
            <div className="col-md-3">
              <h5 className="footer__head-text">CHÍNH SÁCH</h5>
              <ul className="footer__list__ver list-type-none">
                <li>Giới thiệu</li>
                <li>Chính sách Bảo hành</li>
                <li>Chính sách Đổi trả</li>
                <li>Chính sách Mua hàng</li>
                <li>Chính sách Giao hàng</li>
                <li>Thu củ - Đổi mới</li>
                <li>Trả Góp</li>
                <li>Trả góp Online</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 col-xl-3">
              <h5 className="footer__head-text">Kết nối với chúng tôi</h5>
              <ul className="footer__list__hor list-type-none">
                <li>
                  <a href="#">
                    <img
                      className="footer-around-img"
                      src="/shopee.webp"
                      alt="error"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      className="footer-around-img"
                      src="/lazada.webp"
                      alt="error"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      className="footer-around-img"
                      src="/facebook.png"
                      alt="error"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      className="footer-around-img"
                      src="/social_tiktok_icon.svg"
                      alt="error"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      className="footer-around-img"
                      src="/instagram.webp"
                      alt="error"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      className="footer-around-img"
                      src="/youtube.png"
                      alt="errwqeor"
                    />
                  </a>
                </li>
              </ul>
              <br />
              <p>Phương thức thanh toán</p>
              <ul className="footer__list__hor list-type-none">
                <li>
                  <img
                    className="footer-img"
                    src="./payment-1.webp"
                    alt="payment"
                  />
                </li>
                <li>
                  <img
                    className="footer-img"
                    src="./payment-2.png "
                    alt="payment"
                  />
                </li>
                <li>
                  <img
                    className="footer-img"
                    src="./payment-3.webp"
                    alt="payment"
                  />
                </li>
                <li>
                  <img
                    className="footer-img"
                    src="./payment-4.png"
                    alt="payment"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__foot">
        <div className="container">
          <p className="pt-3">
            Bản quyền thuộc về Đức mobile. Cung cấp bởi ssngotat.
          </p>
        </div>
      </div>
    </div>
  );
}
