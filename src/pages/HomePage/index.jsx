import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { productsAPI } from "../../services/api";
import "../../styles/index.scss";

export const HomePage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("@CartList"));
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(
    localStorageData ? localStorageData : []
  );
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
    const itemCart = cartList.find((element) => element.id == newProduct.id);
    if (itemCart) {
      const newCartList = [...cartList];
      const index = newCartList.findIndex((element)=>element.id==newProduct.id);
      newCartList[index].qtty=itemCart.qtty + 1;
      setCartList(newCartList);     
    } else {
      newProduct.qtty = 1;
      setCartList([...cartList, newProduct]);
    }
  };

  const removeCart = (product) => {
    if(product.qtty>1){     
      const newCartList = [...cartList];
      const index = newCartList.findIndex((element)=>element.id==product.id);
      newCartList[index].qtty=product.qtty - 1;      
      setCartList(newCartList);     
    }
    else{
      const removedProduct = cartList.filter(
        (element) => product.id !== element.id);
      setCartList(removedProduct);
    }
  
  };

  const updateCartSize = () => {

    const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.qtty;
    }, 0);

    setCartSize(total);   
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
