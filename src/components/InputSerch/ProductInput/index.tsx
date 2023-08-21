// Styles
import './styles.css';

// React Router Dom
import { Link } from 'react-router-dom';

// React Components
import { Product } from '../../Product';


export const ProductInput = ({ title, id, image, price }) => {
  return (
    <div className="container-product__input">
      <Link to={`/product/${id}`}>
        <Product title={title} price={price} id={id} image={image} />
      </Link>
    </div>
  )
}