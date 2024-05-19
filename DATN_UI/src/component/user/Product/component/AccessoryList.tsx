import { Link } from "react-router-dom";
import { Accessory } from "../../../../model";
interface AccessoryList {
  accessories: Accessory[];
}
export default function AccessoryList({ accessories }: AccessoryList) {
  return (
    <div className="accessory ">
      <ul className="accessory-ls list-type-none">
        {accessories.map((accessory) => {
          return (
            <li className="accessory-it">
              <Link to={`/categories/${accessory.id}`} className="accessory-li">
                <div className="img-box d-flex justify-content-center align-items-center p-2">
                  <span className="text-center">{accessory.name}</span>
                  {/* <img src={accessory.img} alt={accessory.name} /> */}
                </div>
                {/* <p> {accessory.name}</p> */}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
