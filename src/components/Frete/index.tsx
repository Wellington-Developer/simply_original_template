// Styles
import './styles.css'

// Data
import { frete } from "./Utils/data"

// React Icons
import { AiOutlineWhatsApp } from 'react-icons/ai'
import TruckIcon from '../../assets/truck.svg';
import CardIcon from '../../assets/card-2.svg';

export const Frete = () => {
  return (
    <div className="container-section__frete">
      <div className="item-frete">
        <img src={TruckIcon} alt="frete.description" />
        <h1>{frete.description}</h1>
      </div>
      <div className="item-frete">
        <img src={CardIcon} alt="frete.description" />
        <h1>{frete.description2}</h1>
      </div>
      <div className="item-frete">
        <AiOutlineWhatsApp />
        <h1>{frete.description3}</h1>
      </div>
    </div>
  )
}