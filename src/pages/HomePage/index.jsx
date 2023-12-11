import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { productsAPI } from "../../services/api";
import "../../styles/index.scss";

export const HomePage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("@CartList"));  
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(localStorageData? localStorageData:[]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [cartSize, setCartSize] = useState(0);

  const getProducts = async () => {
    const { data } = await productsAPI.get("/products");
    setProductList(data);
  };

  const saveLocalStorage = () => {   
      const cartListJson = JSON.stringify(cartList);
      localStorage.setItem("@CartList", cartListJson);
    
  };


  const addCart = (newProduct) => {
    setCartList([...cartList, newProduct]);
  };

  const removeCart = (index) => {
    const newCartList = [...cartList];
    newCartList.splice(index, 1);
    setCartList(newCartList);
  };

  const updateCartSize = () => {
   setCartSize(cartList.length);
    saveLocalStorage();
  };

  const cleanCart = () => {
    setCartList([]);
  };

  useEffect(() => {
    getProducts();      
  }, []);

  useEffect(() => {
    updateCartSize();
  }, [cartList]);

  // useEffect montagem - carrega os produtos da API e joga em productList
  // useEffect atualização - salva os produtos no localStorage (carregar no estado)
  // adição, exclusão, e exclusão geral do carrinho
  // renderizações condições e o estado para exibir ou não o carrinho
  // filtro de busca
  // estilizar tudo com sass de forma responsiva

  return (
    <>
      <Header setVisibleModal={setVisibleModal} cartSize={cartSize} />
      <main>
        <ProductList productList={productList} addCart={addCart} />
        {visibleModal ? (
          <CartModal
            cartList={cartList}
            removeCart={removeCart}
            setVisibleModal={setVisibleModal}
            cleanCart={cleanCart}
          />
        ) : null}
      </main>
    </>
  );
};
