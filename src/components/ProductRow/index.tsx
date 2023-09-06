// Styles
import './styles.css';

// React Components
import { Product } from '../Product';

// React Hooks
import { useState, useEffect, useRef } from 'react';

// React Icons
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { Skeleton } from '@mui/material';

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

  const array = [1, 2, 3, 4];

  return (
    <>
      {
        category == "loading" ? 
        (
          <div className="container-products__row">
            <div className="product-container__row">
              <div className="product-content__row">
                {
                  array.map((item, index) => {
                    return <div className={`product ${item}`} key={index}>
                      <Skeleton animation="wave" variant="rectangular" width={300} height={400} />
                    </div>
                  })
                } 
              </div>

              <div className="product-content__row">
                {
                  array.map((item, index) => {
                    return <div className={`product ${item}`} key={index}>
                      <Skeleton variant="rectangular" width={300} height={400} />
                    </div>
                  })
                } 
              </div>

              <div className="product-content__row">
                {
                  array.map((item, index) => {
                    return <div className={`product ${item}`} key={index}>
                      <Skeleton variant="rectangular" width={300} height={400} />
                    </div>
                  })
                } 
              </div>

              <div className="product-content__row">
                {
                  array.map((item, index) => {
                    return <div className={`product ${item}`} key={index}>
                      <Skeleton variant="rectangular" width={300} height={400} />
                    </div>
                  })
                } 
              </div>
            </div>
          </div>
        )
        :
        (
          <div className="container-products__row">
            <div className="button">
              <button onClick={handleLeftProduct}><AiOutlineArrowLeft /></button>
              <button onClick={handleRightProduct}><AiOutlineArrowRight /></button>
            </div>
      
            <div className="product-container__row" ref={refferenceProductContainer}>
              <div className="product-content__row" >
                {
                  productsPerCategory.length == 0 ?
                  <div className="skeletons">
                    <Skeleton animation="wave" variant="rectangular" width={300} height={400} />
                    <Skeleton animation="wave" variant="rectangular" width={300} height={400} />
                    <Skeleton animation="wave" variant="rectangular" width={300} height={400} />
                    <Skeleton animation="wave" variant="rectangular" width={300} height={400} />
                  </div>
                  :
                  (
                    productsPerCategory.map((product, index) => (
                      <Product image={product.image} title={product.title} price={product.price} id={product.id} key={index} />)
                      )
                  )
                }
                
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}