// Styles
import { useContext } from 'react';
import './styles.css';

// React Icons
import { GlobalContext } from '../context/GlobalContext';

// React-Router-Dom
import { Link } from 'react-router-dom';

// React Components
import { Popup } from '../Popup';

// Assets
import CartIcon from '../../assets/cart.svg';

type IProduct = {
  image: string,
  title: string,
  price: number,
  id?: number,
}

export const Product = ({ title, price, image, id }: IProduct) => {

  const { showPopup } = useContext(GlobalContext);

  const options = { style: 'currency', currency: 'BRL' }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)

  return (
    <>
    <div className="container-single__product" id={image} >
      <Popup message="Produto adicionado ao carrinho!" show={showPopup} />
      <div className="content-single__product">
        <Link to={`/product/${id}`}>
          <div className="image-single__product" style={{ backgroundImage: `url("https://loja.simply.app.br/arquivos_produtos/159/71466/c4e03ac867bafd38f63d63bd37c3fad220230408104621.jpeg")` }}>
            <div className="discount">
              -5%
            </div>
          </div>
        </Link>

        <div className="containerinfo-single__product">
          <div className="info-single__product">
            <p>{title}</p>
            <div className="price">
              <h1>{formatNumber.format(price)}</h1>
              <span>{formatNumber.format(price - 5)}</span>
            </div>
          </div>
          <div className="button-single__product" >
            <Link to={`/product/${id}`}>
              <button>
                <img src={CartIcon} alt="cart"/>
                Detalhes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}