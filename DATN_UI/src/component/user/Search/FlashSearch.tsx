import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../api";
import { Link, useNavigate } from "react-router-dom";

export default function FlashSearch() {
  const navigate = useNavigate();
  // const flashSearchItems = [
  //   {
  //     name: "Iphone moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "Iphone cu",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "samsung moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "samsung moi",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "Iphone moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "Iphone cu",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "samsung moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "samsung moi",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img20231117101927.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img-20231112-163509.webp",
  //   },
  //   {
  //     name: "oppo moi",
  //     img: "/img20231117101927.webp",
  //   },
  // ];
  const [flashSearchItems, setFlashSearchItems] = useState<Category[] | []>([]);
  useEffect(() => {
    CategoryAPI.getAllShow()
      .then((data) => setFlashSearchItems(data))
      .catch(() => {
        navigate("/error");
      });
  }, []);
  return (
    <div className="fl-search mt-3">
      <ul className="fl-search__list list-type-none">
        {flashSearchItems.map((flashSearchItem) => {
          return (
            <li className="fl-search__item">
              <Link
                to={`/categories/${flashSearchItem.id}`}
                className="fl-search__link d-flex flex-column t"
              >
                {flashSearchItem.image && (
                  <img src={flashSearchItem.image} alt={flashSearchItem.name} />
                )}
                <p className="p-0 mt-2">{flashSearchItem.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
