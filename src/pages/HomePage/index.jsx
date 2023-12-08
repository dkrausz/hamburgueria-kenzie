import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { productsAPI } from "../../services/api";

export const HomePage = () => {
   const [productList, setProductList] = useState([]);
   const [cartList, setCartList] = useState([]);
   const [visibleModal, setVisibleModal] = useState(true);
   
   const getProducts = async ()=>{
     const {data} = await productsAPI.get("/products");     
     setProductList(data);
   }
   
   useEffect(()=>{
      getProducts();
   },[]);

   // useEffect montagem - carrega os produtos da API e joga em productList
   // useEffect atualização - salva os produtos no localStorage (carregar no estado)
   // adição, exclusão, e exclusão geral do carrinho
   // renderizações condições e o estado para exibir ou não o carrinho
   // filtro de busca
   // estilizar tudo com sass de forma responsiva
    
   return (
      <>
         <Header setVisibleModal={setVisibleModal} />
         <main>
            <ProductList productList={productList} />
         {visibleModal? <CartModal cartList={cartList} setVisibleModal={setVisibleModal} /> : null  }

         </main>
      </>
   );
};
