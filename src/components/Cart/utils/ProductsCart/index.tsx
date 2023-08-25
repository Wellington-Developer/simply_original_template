// Styles
import './styles.css';

// React Components
import { useContext, useEffect, useState } from 'react';

// React Context
import { GlobalContext } from '../../../context/GlobalContext';

// React Icons
import { AiOutlineDelete, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';


export const ProductCart = ({ id, qtd, size, color }) => {
  const [ productCart, setProductCart ] = useState<any>()

  const { addProductToCart, removeProductToCart } = useContext(GlobalContext)


  const getProductPerId = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(r => r.json())
    .then(res => setProductCart(res))
  }

  useEffect(() => {
    getProductPerId(id)
  }, [])

  return (
    <>
      {
        productCart &&
        <>
          <div className="container-product__cart">
              <div className="image-product__cart">
                <img src={ productCart.image } alt="image product cart"/>
              </div>

              <div className="info-product__cart">
                <p>{ productCart.title }</p>
                {
                  qtd == 1 ?
                  (<h1>R$ { productCart.price }</h1>) :
                  (<div className="price-product__cart">
                    <h1>R$ { productCart.price * qtd }</h1>
                    <p>R$ { productCart.price } cada</p>
                  </div>)
                }
                <div className="controller-quantity">
                  <div className="quantity">
                    <AiOutlineMinusCircle onClick={ () => removeProductToCart(id, size, color, productCart.price) }/>
                    <h3>{ qtd }</h3>
                    <AiOutlinePlusCircle onClick={ () => addProductToCart(id, productCart.title, qtd, size, color, productCart.price) }/>
                  </div>
                  <div className="controller-info">
                    <p>{size}</p>
                    <p>{color}</p>
                  </div>
                </div>
              </div>
            </div>
        </>
      }
    </>
  )
}