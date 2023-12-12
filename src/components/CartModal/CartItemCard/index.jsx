import { MdDelete } from "react-icons/md";
import style from "./style.module.scss";
import "../../../styles/index.scss";

export const CartItemCard = ({ product,removeCart,index }) => {
  return (
    <li className={style.container}>
      <div className={style.content}>
         <div className={style.image__container}>
        <img src={product.img} alt={product.name} />
        </div>
        <div>
          <h3 className="title">{product.name}</h3>
          <span className="paragraph price">
            {" "}
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
      <span className={style.quantity}>x{product.qtty}</span>
      <button aria-label="delete" title="Remover item" className={style.button} onClick={()=>removeCart(product)}>
        <MdDelete size={21} />
      </button>
    </li>
  );
};
