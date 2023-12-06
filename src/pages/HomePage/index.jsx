import { useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import axios from "axios";

export const HomePage = () => {
   const [productList, setProductList] = useState([]);
   const [cartList, setCartList] = useState([]);
   
   const getProducts = async () => {
      const baseURL ="https://hamburgueria-kenzie-json-serve.herokuapp.com";
      const api = axios.create({baseURL,timeout: 5*1000});
      const res = await api.get("/products");
      setProductList(res.data);
      console.log(res.data);
   // useEffect montagem - carrega os produtos da API e joga em productList
   // useEffect atualização - salva os produtos no localStorage (carregar no estado)
   // adição, exclusão, e exclusão geral do carrinho
   // renderizações condições e o estado para exibir ou não o carrinho
   // filtro de busca
   // estilizar tudo com sass de forma responsiva
   }
   // getProducts();
   return (
      <>
         <Header />
         <main>
            <ProductList productList={productList} />
            <CartModal cartList={cartList} />
         </main>
      </>
   );
};
