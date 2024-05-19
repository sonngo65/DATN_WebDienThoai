import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewsAPI } from "../../../api";
import { formatDate } from "date-fns";
import { useDispatch } from "react-redux";
import * as ActionType from "../../../store/actionTypes";

export default function NewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [news, setNews] = useState<News>({
    id: "",
    title: "",
    image: "",
    content: "",
    createdTime: null,
    summary: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);

    NewsAPI.getById(id as string)
      .then((data) => {
        setNews(data);
        dispatch({
          type: ActionType.SET_BREADCUMB,
          payload: [
            { name: "Tin tức", url: "/news" },
            { name: data.title, url: null },
          ],
        });
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);
  return (
    <div className="news-detail my-4">
      <div className="container">
        <div className="bg-white rounded p-4">
          <h2 className="title">{news.title}</h2>
          <p>
            Đăng lúc:{" "}
            {formatDate(new Date(news.createdTime), "HH:mm dd-MM-yyyy")}
          </p>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: news.content }}
          ></div>
        </div>
      </div>
    </div>
  );
}
