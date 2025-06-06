import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import style from "./style.module.scss";

export const Header = ({ setVisibleModal, cartSize }) => {
  

  return (
    <header className={style.header}>
      <img src={Logo} alt="Logo Kenzie Burguer" />
      
        <button
          onClick={() => setVisibleModal(true)}
          className={style.cart__button} >
          <MdShoppingCart size={24} />
          <span>{cartSize}</span>
        </button>
      
    </header>
  );
};
