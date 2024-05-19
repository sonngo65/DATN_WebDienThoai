import { useEffect, useState } from "react";
import { NewsAPI } from "../../../api";
import { formatDate } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as ActionType from "../../../store/actionTypes";

export default function News() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [newsList, setNewsList] = useState([
  //   {
  //     id: 1,
  //     title: "tuýp quay phim đẹp bằng điện thoại",
  //     img: "./new-img-2.webp",
  //     createdDay: "30/03/2024",
  //     description:
  //       "Chúng ta đang sống ở thời đại màn hình phẳng được phát triển rộng rãi ở khắp mọi nơi. Tất cả các thiết bị như tablet (máy tính bảng), laptop, TV, trình duyệt mạng xã hội như Facebook, Tweeter, Youtube, … đều hiển thị video bằng định dạng ngang. Video sản phẩm sẽ không được hoàn hảo, không thể hiện được tổng quan, toàn bộ bố cục, bối cảnh và có một số bất tiện nếu bạn quay ở chế độ quay dọc.",
  //   },
  //   {
  //     id: 2,
  //     title: "tuýp quay phim đẹp bằng điện thoại",
  //     img: "./news-img-3.webp",
  //     createdDay: "30/03/2024",
  //     description:
  //       "Chúng ta đang sống ở thời đại màn hình phẳng được phát triển rộng rãi ở khắp mọi nơi. Tất cả các thiết bị như tablet (máy tính bảng), laptop, TV, trình duyệt mạng xã hội như Facebook, Tweeter, Youtube, … đều hiển thị video bằng định dạng ngang. Video sản phẩm sẽ không được hoàn hảo, không thể hiện được tổng quan, toàn bộ bố cục, bối cảnh và có một số bất tiện nếu bạn quay ở chế độ quay dọc.",
  //   },
  //   {
  //     id: 3,
  //     title: "tuýp quay phim đẹp bằng điện thoại",
  //     img: "./news-img-1.webp",
  //     createdDay: "30/03/2024",
  //     description:
  //       "Chúng ta đang sống ở thời đại màn hình phẳng được phát triển rộng rãi ở khắp mọi nơi. Tất cả các thiết bị như tablet (máy tính bảng), laptop, TV, trình duyệt mạng xã hội như Facebook, Tweeter, Youtube, … đều hiển thị video bằng định dạng ngang. Video sản phẩm sẽ không được hoàn hảo, không thể hiện được tổng quan, toàn bộ bố cục, bối cảnh và có một số bất tiện nếu bạn quay ở chế độ quay dọc.",
  //   },
  //   {
  //     id: 4,
  //     title: "tuýp quay phim đẹp bằng điện thoại",
  //     img: "./news-img-3.webp",
  //     createdDay: "30/03/2024",
  //     description:
  //       "Chúng ta đang sống ở thời đại màn hình phẳng được phát triển rộng rãi ở khắp mọi nơi. Tất cả các thiết bị như tablet (máy tính bảng), laptop, TV, trình duyệt mạng xã hội như Facebook, Tweeter, Youtube, … đều hiển thị video bằng định dạng ngang. Video sản phẩm sẽ không được hoàn hảo, không thể hiện được tổng quan, toàn bộ bố cục, bối cảnh và có một số bất tiện nếu bạn quay ở chế độ quay dọc.",
  //   },
  //   {
  //     id: 5,
  //     title: "tuýp quay phim đẹp bằng điện thoại",
  //     img: "./news-img-1.webp",
  //     createdDay: "30/03/2024",
  //     description:
  //       "Chúng ta đang sống ở thời đại màn hình phẳng được phát triển rộng rãi ở khắp mọi nơi. Tất cả các thiết bị như tablet (máy tính bảng), laptop, TV, trình duyệt mạng xã hội như Facebook, Tweeter, Youtube, … đều hiển thị video bằng định dạng ngang. Video sản phẩm sẽ không được hoàn hảo, không thể hiện được tổng quan, toàn bộ bố cục, bối cảnh và có một số bất tiện nếu bạn quay ở chế độ quay dọc.",
  //   },
  //   {
  //     id: 6,
  //     title: "tuýp quay phim đẹp bằng điện thoại",
  //     img: "./news-img-3.webp",
  //     createdDay: "30/03/2024",
  //     description:
  //       "Chúng ta đang sống ở thời đại màn hình phẳng được phát triển rộng rãi ở khắp mọi nơi. Tất cả các thiết bị như tablet (máy tính bảng), laptop, TV, trình duyệt mạng xã hội như Facebook, Tweeter, Youtube, … đều hiển thị video bằng định dạng ngang. Video sản phẩm sẽ không được hoàn hảo, không thể hiện được tổng quan, toàn bộ bố cục, bối cảnh và có một số bất tiện nếu bạn quay ở chế độ quay dọc.",
  //   },
  // ]);
  const [newsList, setNewsList] = useState<News[] | []>([]);
  useEffect(() => {
    NewsAPI.getAllShow()
      .then((data: any) => {
        setNewsList(data);
      })
      .catch(() => {
        navigate("/error");
      });
    dispatch({
      type: ActionType.SET_BREADCUMB,
      payload: [{ name: "Tin tức", url: null }],
    });
  }, []);

  return (
    <div className="news my-4">
      <div className="container">
        <div className="news-head rounded p-3 bg-white my-3">
          <div className="row g-1">
            <div className="col-12 col-md-7">
              {newsList.length > 0 && (
                <div className="news-top-1 position-relative">
                  <div className="img">
                    <img src={newsList[0].image} alt={newsList[0].title} />
                  </div>
                  <div className="info position-absolute">
                    <div className="title">
                      <Link to={`/news/${newsList[0].id}`}>
                        {newsList[0].title}
                      </Link>
                    </div>
                    <div className="description">{newsList[0].summary}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-12 col-md-5">
              <ul className="news-top-ls list-type-none">
                {newsList.slice(1, 6).map((newsItem) => {
                  return (
                    <li className="news-top-it">
                      <Link
                        to={`/news/${newsItem.id}`}
                        className="news-top-li  d-flex justify-content-center align-items-center"
                      >
                        <div className="img">
                          {" "}
                          <div className="img-box">
                            <img src={newsItem.image} alt={newsItem.title} />
                          </div>
                        </div>
                        <div className="info ps-2">
                          <div className="title">{newsItem.title}</div>
                          <div className="created-day">
                            {formatDate(
                              new Date(newsItem.createdTime),
                              "HH:mm dd-MM-yyyy"
                            )}
                          </div>
                          <div className="description">{newsItem.summary}</div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="news-body rounded p-3 bg-white">
          <div className="title mb-4">
            <h5>Tin, Mẹo và kỹ thuật công nghệ</h5>
          </div>
          <div className="all-news">
            <div className="row g-3">
              {newsList.slice(6).map((newsItem) => {
                return (
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="news-item">
                      <Link
                        to={`/news/${newsItem.id}`}
                        className="link-none-type"
                      >
                        <div className="img">
                          <img src={newsItem.image} alt={newsItem.title} />
                        </div>
                        <div className="hash-tag px-2 position-relative">
                          <ul className="hash-tag-ls position-absolute list-type-none d-flex justify-content-center align-items-center">
                            <li className="hash-tag-it">
                              <a href="">Cach ket noi wifi</a>
                            </li>
                            <li className="hash-tag-it">
                              <a href="">10 meo ve dien thoai</a>
                            </li>
                            <li className="hash-tag-it">
                              <a href="">bao ve dien thoai</a>
                            </li>
                          </ul>
                        </div>
                        <div className="info p-3">
                          <div className="title mb-3">{newsItem.title}</div>
                          <div className="created-day">
                            {formatDate(
                              new Date(newsItem.createdTime),
                              "HH:mm dd-MM-yyyy"
                            )}
                          </div>
                          <div className="description">{newsItem.summary}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
