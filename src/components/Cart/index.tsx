// Styles
import './styles.css';

// React Components
import { InfoClient } from "../InfoClient";
import { ProductCart } from './utils/ProductsCart';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';


export const Cart = () => {
  const userAtive = localStorage.getItem("user-active");
  const { cart } = useContext(GlobalContext);
  let soma = 0;
  const [productPrice, setProductPrice] = useState(0)
  const [discount, setDiscount] = useState();
  const [hasDiscount, setHasDiscount] = useState(0)

  const handleChangeDiscount = (e: any) => {
    setDiscount(e.target.value)
    if (discount == "test") {
      setHasDiscount(5)
    } else {
      setHasDiscount(0)
    }
  }

  const sumPrice = () => {
    cart.map((product) => {
      soma += product.price
      setProductPrice(soma)
    })
  }

  useEffect(() => {
    sumPrice()
  }, [cart])

  return (
    <>
        <Link to="/">
          <span className="home">← Voltar para home</span>
        </Link>
      {userAtive ? (
        <div className="container-section__cart">
          
        <div className="left-side__cart">
          <h2>Produtos adicionados</h2>
          <div className="product-side__cart">
            {
              cart.length > 0 ?
                (
                  cart.map((product, index) => {
                    return <ProductCart title={product.title} image={product.image} id={product.id} price={product.price} key={index} />
                  })
                ) : (
                  <p>Adicione produtos ao carrinho.</p>
                )
            }
          </div>
        </div>

        <div className="right-side__cart">
          <h2>Resumo do pedido</h2>
          <div className="product-discount__cart">
            <input
              type="text"
              placeholder="Cupom de desconto"
              onChange={ handleChangeDiscount }
            />
          </div>

          <div className="quicly-resume__cart">
            <h4>Desconto:</h4>
            <h3>R$ { hasDiscount }</h3>
          </div>

          <div className="quicly-resume__cart">
            <h4>Total:</h4>
            <h3>R$ { productPrice - hasDiscount}</h3>
          </div>

          <div className="button">

          </div>
        </div>
      </div>
    ) : (
      <InfoClient />
    )}
    </>
  )
}