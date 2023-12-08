import "../../../styles/index.scss"
import style from "./style.module.scss"

export const ProductCard = ({ product }) => {
    return(
        <li className={style.container}>
            <img src={product.img} alt={product.name} />
            <div  className={style.contains}>
                <h3 className="title">{product.name}</h3>
                <span className="paragraph">{product.category}</span>
                <span className="paragraph price">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
                <button className="button sm">Adicionar</button>
            </div>
        </li>
    )
}