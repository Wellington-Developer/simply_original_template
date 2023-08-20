// Styles
import './styles.css';

// React Components
import { Banner } from "../Banner"
import { Categories } from "../Categories"
import { Frete } from "../Frete"
import { ProductRowCategories } from "../ProductRow/ProductRowCategories"
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Home = () => {
  return (
    <div className="container-home">
      <Header />
      <Banner />
      <Categories />
      <ProductRowCategories />
      <Frete />
      <Footer />
    </div>
  )
}