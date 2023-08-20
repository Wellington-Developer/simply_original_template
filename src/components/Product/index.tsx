// Styles
import { useContext } from 'react';
import './styles.css';

// React Icons
import { BiCartAdd } from 'react-icons/bi';
import { GlobalContext } from '../context/GlobalContext';

import { Popup } from '../Popup';

type IProduct = {
  image: string,
  title: string,
  price: number,
  id?: number
}

export const Product = ({ title, price, image, id }: IProduct) => {

  console.log(image)

  const { setProductToCart, showPopup } = useContext(GlobalContext);

  const options = { style: 'currency', currency: 'BRL' }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)

  return (
    <div className="container-single__product" >
      <Popup message="Produto adicionado ao carrinho!" show={showPopup} />
      <div className="content-single__product">
        <div className="image-single__product" style={{ backgroundImage: `url("https://loja.simply.app.br/arquivos_produtos/159/71466/c4e03ac867bafd38f63d63bd37c3fad220230408104621.jpeg")` }}></div>

        <div className="containerinfo-single__product">
          <div className="info-single__product">
            <p>{title}</p>
            <h1>{formatNumber.format(price)}</h1>
          </div>
          <div className="button-single__product" onClick={() => setProductToCart(id)}>
            <button>
              <BiCartAdd />
              Adicionar
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}