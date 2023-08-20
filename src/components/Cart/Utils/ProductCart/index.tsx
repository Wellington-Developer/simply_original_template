// Styles
import './styles.css';

// React Icons
import { BiTrash } from 'react-icons/bi';

// React Context
import { useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalContext';

// React Router Dom
import { Link } from 'react-router-dom';

export const ProductCart = ({ image, title, price, id }) => {
  const { deleteProductToCart } = useContext(GlobalContext);
  
  return (
    <div className="container-singleproduct__cart">
      <Link to={`/product/${id}`}>
        <div className="left-sideproduct__cart">
          <img src={image} alt={id} />
        </div>
      </Link>

        <div className="right-sideproduct__cart">
          <Link to={`/product/${id}`}>
            <div className="left-side">
              <h1>{ title }</h1>
              <h4>$ { price }</h4>
            </div>
          </Link>

          <div className="right-side" onClick={ () => deleteProductToCart(id) }>
            <BiTrash />
          </div>
        </div>
    </div>
  )
}