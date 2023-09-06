// Styles
import './styles.css';

// React Hooks
import { useContext, useState, useEffect } from "react"

// React Context
import { GlobalContext } from "../../context/GlobalContext"

// React Components
import { ProductRow } from '..';
import { Product } from '../../Product';
import { Link } from 'react-router-dom';

export const ProductRowCategories = () => {
  const { allCategories } = useContext(GlobalContext);
  const [ productsLocal, setProductsLocal ] = useState<any>()

  const fetchLocalStorageProducts = () => {
    const localStorageProducts = JSON.parse(localStorage.getItem("produtos"));
    setProductsLocal(localStorageProducts);
  }

  useEffect(() => {
    fetchLocalStorageProducts()
  }, [])


  return (
    <>
      <div className="products-new">
        {
          productsLocal && productsLocal.map((item, index) => {
            return <Product image={item.image} title={item.title} price={item.price} id={index} />
          })
        }
      </div>
      {
        allCategories.length == 0 ?
        (
          <div className="product-category__row">
            <div className="info-category">
              <h1>Carregando Categorias!</h1>
            </div>
            <div className="product-content__row">
              <ProductRow category="loading"/>
            </div>
          </div>
        )
        :
        (allCategories.map((category, index) => {
          return <div className="product-category__row" key={index}>
            <div className="info-category">
              <h1>{category}</h1>
              <Link to={`/category/${category}`}>
                <p>Ver mais</p>
              </Link>
            </div>
            <div className="product-content__row">
              <ProductRow category={category}/>
            </div>
          </div>
        }))
      }
    </>
  )
}