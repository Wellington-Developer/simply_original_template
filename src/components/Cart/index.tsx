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
  const [ message, setMessage ] = useState<any>([])
  const sumProductCart = () => {
    cart.map((productCart) => {
      soma += productCart.totalPrice
      setProductPrice(soma)
    })
  }

  const messageToClient = () => {
    cart.map((product) => {
      setMessage([...message, `[*] ${product.nameProduct} - Quantidade: ${product.qtd} - Cor: ${product.color} - Tamanho: ${product.size}. Fica um total de ${product.totalPrice}`])
    })

    console.log(message)
  }

  const handleChangeDiscount = (e: any) => {
    setDiscount(e.target.value)
    if (discount == "test") {
      setHasDiscount(5)
    } else {
      setHasDiscount(0)
    }
  }

  useEffect(() => {
    sumProductCart()
  }, [cart])

  return (
    <div className="container">
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
                    return <ProductCart id={ product.id } qtd={ product.qtd } size={ product.size } color={ product.color } key={index}/>
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
            {
              cart.length <= 0 ?
              (<h1>R$ 0</h1>) :
              (<div className="resume-cart">
                <a href={`https://wa.me//556281470582?text=${message}`}>
                  <button onClick={messageToClient}>Finalizar pedido</button>
                </a>
                <h1>R$ { (productPrice - hasDiscount)}</h1>
              </div>)
            }
          </div>
        </div>
      </div>
    ) : (
      <InfoClient />
    )}
    </div>
  )
}