// Styles
import './styles.css'

// Data
import { frete } from "./Utils/data"

// React Icons
import { AiOutlineShoppingCart } from 'react-icons/ai'

export const Frete = () => {
  return (
    <div className="container-section__frete">
      <div className="item-frete">
        <AiOutlineShoppingCart />
        <h1>{frete.description}</h1>
      </div>
      <div className="item-frete">
        <AiOutlineShoppingCart />
        <h1>{frete.description2}</h1>
      </div>
      <div className="item-frete">
        <AiOutlineShoppingCart />
        <h1>{frete.description3}</h1>
      </div>
    </div>
  )
}