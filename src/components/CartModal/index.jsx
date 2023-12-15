import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import style from "./style.module.scss";
import "../../styles/index.scss";
import { useEffect, useRef } from "react";

export const CartModal = ({
  cartList,
  setVisibleModal,
  cleanCart,
  removeCart,
}) => {
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.qtty * product.price;
  }, 0);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!modalRef.current?.contains(event.target)) {
        setVisibleModal(false);
      }
    };
    const handleKeyDown = (event) => {
      console.log(event.key);
      if (event.key === "Escape") {
        setVisibleModal(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div role="dialog" className={style.overlay}>
      <div className={style.container} ref={modalRef}>
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
        <ul className={style.product__list}>
          {cartList.map((product, index) => (
            <CartItemCard
              key={index}
              product={product}
              removeCart={removeCart}
            />
          ))}
        </ul>

        <div className={style.lower__container}>
          <div className={style.total__container}>
            <span className="paragraph bold dark">Total</span>
            <span className="paragraph bold">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button className="button" onClick={() => cleanCart()}>
            Remover todos
          </button>
        </div>
      </div>
    </div>
  );
};
