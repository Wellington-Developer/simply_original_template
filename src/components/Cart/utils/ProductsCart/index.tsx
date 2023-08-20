// Styles
import './styles.css';

// React Components
import { useContext } from 'react';

// React Context
import { GlobalContext } from '../../../context/GlobalContext';

// React Icons
import { AiOutlineDelete } from 'react-icons/ai';

export const ProductCart = ({ title, image, price, id }) => {
  const { deleteProductToCart } = useContext(GlobalContext);

  return (
    <div className="container-product__cart">
      <div className="image-product__cart">
        <img src={ image } alt="image product cart"/>
      </div>

      <div className="info-product__cart">
        <p>{ title }</p>
        <h1>R$ {price}</h1>
      </div>
        <div className="controller-product__cart" onClick={ () => deleteProductToCart(id) }>
          <AiOutlineDelete />
        </div>
    </div>
  )
}