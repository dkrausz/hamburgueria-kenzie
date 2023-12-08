import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import style from "./style.module.scss";
import "../../styles/index.scss";

export const CartModal = ({ cartList, setVisibleModal }) => {
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price;
  }, 0);

  return (
    <div role="dialog" className={style.overlay}>
      <div className={style.container}>
        <div className={style.header}>
          <h2 className="title two">Carrinho de compras</h2>
          <button
            aria-label="close"
            title="Fechar"
            onClick={() => setVisibleModal(false)}
          >
            <MdClose size={21} />
          </button>
        </div>
        <div>
          <ul>
            {cartList.map((product) => (
              <CartItemCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
        <div>
          <div className={style.total__container}>
            <span className="paragraph bold dark">Total</span>
            <span className="paragraph bold">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button className="button">Remover todos</button>
        </div>
      </div>
    </div>
  );
};
