// Styles
import './styles.css';


// React Components
import { Footer } from "../Footer"
import { Header } from "../Header"

// React Hooks
import { useRef, useState } from "react";

// React Router Dom
import { Link } from 'react-router-dom';

// React Icons
import { IoIosArrowForward } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineWhatsApp } from 'react-icons/ai';

// Assets
import TruckIcon from '../../assets/truck.svg';
import CardIcon from '../../assets/card-2.svg';

export const ProductPage = () => {
  const images = ["https://loja.simply.app.br/arquivos_produtos/159/71468/cde93a9826ac6a605d98acbfe0faed3f20230407234705.jpeg", "https://loja.simply.app.br/arquivos_produtos/159/71468/cde93a9826ac6a605d98acbfe0faed3f20230407234705.jpeg"]

  const refferenceImage = useRef(null)

  const [ contProduct, setContProduct ] = useState(1);

  const handleImageOnClick = () => {
    refferenceImage.current.scrollLeft += refferenceImage.current.offsetWidth + 24;
  }

  return (
    <>
      <Header  />
        <div className="container container-product__page">
          <div className="content-product__page">
            <div className="leftside-product__page" ref={ refferenceImage } onClick={ handleImageOnClick }>
              {
                images && images.map((image, index) => {
                  return <img src={image} alt="product image" key={ index }/>
                })
              }
            </div>
            <div className="rightside-product__page">
              <div className="bradcrumb">
                <Link to="/"><h1>Home</h1></Link>
                <IoIosArrowForward />
                <Link to="/"><h1>Vestidos</h1></Link>
                <IoIosArrowForward />
                <Link to="/"><h1>Vestido longo escuro</h1></Link>
              </div>

              <div className="info-product__page">
                <h1>Vestido Longo Rosa Escuro</h1>
                <div className="evaluation">
                  <div className="icons-star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p>(1 avaliação)</p>
                </div>

                <div className="description-product__page">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil est error quod officiis, ab nesciunt quis possimus facilis cupiditate ducimus eaque, voluptatem a. Consequatur, dolore?</p>
                </div>
              </div>

              <div className="buy-product__page">
                <div className="price-product__page">
                  <h1>R$ 89,00</h1>
                  <p>R$ 109,00</p>
                </div>

                <div className="discount-product__page">
                  <p>Economia de R$ 20,00</p>
                </div>

                <div className="freight">
                  <div className="item-frete">
                    <img src={TruckIcon} alt="frete.description" />
                    <h1>10x sem juros no cartão de crédito.</h1>
                  </div>
                  <div className="item-frete">
                    <img src={CardIcon} alt="frete.description" />
                    <h1>10% de desconto para pagamento via PIX</h1>
                  </div>
                </div>

                <div className="select-product__page">
                  <div className="size-product__page">
                    <p>Tamanho:</p>
                    <select name="Selecione" id="">
                      <option value="P">P</option>
                      <option value="P">M</option>
                      <option value="P">G</option>
                    </select>
                  </div>

                  <div className="quantity-product__page">
                    <p>Quantidade</p>
                    <div className="infoquantity-product__page">
                      <AiOutlineMinusCircle />
                        <h3>{ contProduct }</h3>
                      <AiOutlinePlusCircle />
                    </div>
                  </div>
                </div>

                <div className="buttonbuy-product__page">
                  <button id="button-wpp"><AiOutlineWhatsApp />Compra rápida pelo whatsapp</button>
                  <button>Adicionar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}