// Styles
import './styles.css';

// React Components
import { Product } from '../Product';

// React Hooks
import { useState, useEffect, useRef } from 'react';

// React Icons
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

export const ProductRow = ({ category }) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;
  const [productsPerCategory, setProductsPerCategory] = useState([]);
  const refferenceProductContainer = useRef<any>(0);

  const handleRightProduct = () => {
    refferenceProductContainer.current.scrollLeft += 290
  }

  const handleLeftProduct = () => {
    refferenceProductContainer.current.scrollLeft -= 290
  }

  const fetchProductsPerCategory = () => {
    fetch(url)
      .then(r => r.json())
      .then(r => setProductsPerCategory(r))
  }

  useEffect(() => {
    fetchProductsPerCategory();
  }, [])

  return (
    <div className="container-products__row">
      <div className="button">
        <button onClick={handleLeftProduct}><AiOutlineArrowLeft /></button>
        <button onClick={handleRightProduct}><AiOutlineArrowRight /></button>
      </div>

      <div className="product-container__row" ref={refferenceProductContainer}>
        <div className="product-content__row" >
          {
            productsPerCategory.map((product, index) => {
              return <Product image={product.image} title={product.title} price={product.price} id={product.id} key={index} />
            })
          }
        </div>
      </div>
    </div>
  )
}