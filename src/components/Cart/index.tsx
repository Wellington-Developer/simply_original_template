// Styles
import { useContext, useEffect, useState } from 'react';
import { Input } from './Utils/Input';
import './styles.css';

// React Icons
import { BiX } from 'react-icons/bi';
import { GlobalContext } from '../context/GlobalContext';
import { ProductCart } from './Utils/ProductCart';
import { PaymentMethods } from './Utils/PaymentMethods';

export const Cart = ({ modal } : any) => {
  const {cart} = useContext(GlobalContext);
  let soma = 0;
  const [ productPrice, setProductPrice ] = useState(0)
  const [ discount, setDiscount ] = useState();
  const [ hasDiscount, setHasDiscount ] = useState(0)

  const handleChangeDiscount = (e: any) => {
    setDiscount(e.target.value)
    if(discount == "test") {
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
    <div className="section-side__cart">
      <div className="content-side__cart">
        <div className="left-side__cart">
          <div className="info-contact__cart">
            <h3>Informações de Entrega</h3>
          </div>

          <div className="form">
            <Input />
          </div>

          <div className="payment-method__cart">
            <h3>Forma de Pagamento</h3>

            <div className="box-payment__cart">
              <PaymentMethods />
            </div>
          </div>
        </div>
        <div className="right-side__cart">
          <div className="product-container__cart">
            <h3>Resumo do pedido</h3>
            <div className="product-content__cart">
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
          <div className="product-discount__cart">
              <input
                type="text"
                placeholder="Cupom de desconto"
                onChange={ handleChangeDiscount }
              />
          </div>
          <div className="quicly-resume__cart">
              <h4>Desconto:</h4>
              {
                (<h3>R$ {hasDiscount}</h3>)
              }
          </div>
          <div className="quicly-resume__cart">
              <h4>Total:</h4>
              {
                cart.length > 0 ? 
                (<h3>R$ {hasDiscount ? (productPrice - hasDiscount) : (productPrice)}</h3>) 
                : 
                (<h3>R$ 0</h3>)
              }
          </div>
        </div>
      <div className="content-close__cart" onClick={modal}>
        <BiX />
      </div>
      </div>
    </div>
  )
}