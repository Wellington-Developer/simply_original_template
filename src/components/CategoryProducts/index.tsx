// Styles
import './styles.css';

// React Router Dom
import { useParams } from "react-router-dom"

// React Hooks
import { useEffect, useContext } from 'react';
import { GlobalContext } from "../context/GlobalContext";
import { Product } from "../Product";
import { Header } from '../Header';
import { Footer } from '../Footer';

export const CategoryProduct = () => {
  const { id } = useParams();
  const { getProductsPerCategory, productsCategory } = useContext(GlobalContext);

  useEffect(() => {
    getProductsPerCategory(id)
  }, [productsCategory])

  return (
      <>
      <Header />
      <div className="container-category__product">
        <h1>{id}</h1>
        <p>Subcategoria</p>
        <div className="content-category__product">
          {
            productsCategory &&
            productsCategory.map((product, index) => {
              return <Product title={product.title} image={product.image} price={product.price} key={index} id={product.id}/> 
            })
          }
        </div>
      </div>
      <Footer />
      </>
  )
}