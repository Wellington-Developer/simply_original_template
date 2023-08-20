// Styles
import './styles.css';

// React Components
import { Banner } from "../Banner"
import { Categories } from "../Categories"
import { Frete } from "../Frete"
import { ProductRowCategories } from "../ProductRow/ProductRowCategories"

export const Home = () => {
  return (
    <div className="container-home">
      <Banner />
      <Categories />
      <ProductRowCategories />
      <Frete />
    </div>
  )
}