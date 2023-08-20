// Styles
import { GlobalContext } from '../../context/GlobalContext';
import { useContext } from 'react';
import { BiCartAdd } from 'react-icons/bi';
import './styles.css';
import { Link } from 'react-router-dom';

export const ProductInput = ({ title, id, image, price }) => {
  const { setProductToCart } = useContext(GlobalContext);
  
  
  return (
    <div className="container-product__input">
      <Link to={`/product/${id}`}>
        <div className="left-side">
          <img src={image} alt={ title } />
          <h1>{ title }</h1>
        </div>
      </Link>

      <div className="right-side">
        <h3>R$ { price }</h3>
        <button onClick={() => setProductToCart(id)} className='add-to__cart'><BiCartAdd /></button>
      </div>
    </div>
  )
}