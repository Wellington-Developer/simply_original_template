// Styles
import './styles.css';

// React Components
import { useContext, useState } from 'react';

// React Context
import { GlobalContext } from '../../../context/GlobalContext';

// React Icons
import { AiOutlineDelete, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';


export const ProductCart = ({ title, image, price, id, quantity }) => {
  const { deleteProductToCart } = useContext(GlobalContext);
  const [ totalQuantityProducts, setTotalQuantityProducts ] = useState(quantity)

  const { productQuantityCart } = useContext(GlobalContext)

  const handleQuantityMinus = () => {
    setTotalQuantityProducts(totalQuantityProducts - 1)
    productQuantityCart(totalQuantityProducts - 1)
  }

  const handleQuantityPlus = () => {
    setTotalQuantityProducts(totalQuantityProducts + 1)
    productQuantityCart(totalQuantityProducts + 1)
  }


  return (
    <div className="container-product__cart">
      <div className="image-product__cart">
        <img src={ image } alt="image product cart"/>
      </div>

      <div className="info-product__cart">
        <p>{ title }</p>
        <h1>R$ {price * totalQuantityProducts}</h1>
        <div className="controller-quantity">
          <AiOutlineMinusCircle onClick={ handleQuantityMinus }/>
          <h3>{totalQuantityProducts}</h3>
          <AiOutlinePlusCircle onClick={ handleQuantityPlus }/>
        </div>
      </div>
        <div className="controller-product__cart" onClick={ () => deleteProductToCart(id) }>
          <AiOutlineDelete />
        </div>
    </div>
  )
}