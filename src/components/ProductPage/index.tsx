// Styles
import './styles.css';


// React Components
import { Footer } from "../Footer"
import { Header } from "../Header"

// React Hooks
import { useContext, useRef, useState, useEffect } from "react";

// React Router Dom
import { Link, useParams } from 'react-router-dom';

// React Icons
import { IoIosArrowForward } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineWhatsApp } from 'react-icons/ai';

// Assets
import PaymentPix from '../../assets/pix.svg';
import CardIcon from '../../assets/card-2.svg';
import Cart from '../../assets/cart.svg';
import { ProductRow } from '../ProductRow';
import { GlobalContext } from '../context/GlobalContext';

export const ProductPage = () => {
  const images = ["https://loja.simply.app.br/arquivos_produtos/159/71468/cde93a9826ac6a605d98acbfe0faed3f20230407234705.jpeg", "https://loja.simply.app.br/arquivos_produtos/159/71468/cde93a9826ac6a605d98acbfe0faed3f20230407234705.jpeg"]

  const refferenceImage = useRef(null)
  const refWidth = useRef(null)
  const [ contProduct, setContProduct ] = useState(1);
  const { setProductToCart } = useContext(GlobalContext)
  const param = useParams()
  const [ product, setProduct ] = useState<any>()
  
  const handleScrollLeft = () => {
    refWidth.current.scrollLeft -= refWidth.current.offsetWidth;
  }
  const handleScrollRight = () => {
    refWidth.current.scrollLeft += refWidth.current.offsetWidth;
  }

  const handleCounterPlus = () => {
    setContProduct(contProduct + 1)
  }

  const fetchProduct = () => {
    fetch(`https://fakestoreapi.com/products/${param.id}`)
    .then(r => r.json())
    .then(jsn => setProduct(jsn))
  }

  const handleCounterMinus = () => {
    if(contProduct <= 1) {
      setContProduct(1)
    } else {
      setContProduct(contProduct - 1)
    }

    console.log(product)
    
  }

  const handleImageOnClick = () => {
    refferenceImage.current.scrollLeft += refferenceImage.current.offsetWidth + 24;
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <>
      <Header  />
        {
          product && <>
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
                <Link to="/"><h1>{product.category}</h1></Link>
                <IoIosArrowForward />
                <Link to="/"><h1>Página atual</h1></Link>
              </div>

              <div className="info-product__page">
                <h1>{product.title}</h1>
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
                  <p>{product.description}</p>

                  <a href="#info-desc">Ver mais</a>
                </div>
              </div>

              <div className="buy-product__page">
                <div className="price-product__page">
                  <h1>R$ {product.price}</h1>
                  <p>R$ 109,00</p>
                </div>

                <div className="discount-product__page">
                  <p>Economia de R$ 20,00</p>
                </div>

                <div className="freight">
                  <div className="item-frete">
                    <img src={CardIcon} alt="frete.description" />
                    <h1>10x sem juros no cartão de crédito.</h1>
                  </div>
                  <div className="item-frete">
                    <img src={ PaymentPix } alt="frete.description" />
                    <h1>10% de desconto para pagamento via PIX</h1>
                  </div>
                </div>

                <div className="select-product__page">
                  <div className="size-product__page">
                    <p>Cor:</p>
                    <select name="Selecione" id="">
                      <option value="P">Rosa</option>
                      <option value="P">Verde</option>
                      <option value="P">Florido</option>
                    </select>
                  </div>

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
                      <AiOutlineMinusCircle onClick={ handleCounterMinus }/>
                        <h3>{ contProduct }</h3>
                      <AiOutlinePlusCircle onClick={ handleCounterPlus } />
                    </div>
                  </div>
                </div>

                <div className="buttonbuy-product__page">
                  <button onClick={() => setProductToCart(product.id,  contProduct, "P", "Vermelho")}>
                    <img src={ Cart } alt="cart" />
                    Adicionar</button>
                  <button id="button-wpp"><AiOutlineWhatsApp />Compra rápida pelo whatsapp</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="info-desc">
        <div className="container-info__products" ref={refWidth}>
                <div className="left-side">
                  <div className="title" >
                    <h1>Descrição</h1>
                    <p onClick={handleScrollRight}>Ver avaliações</p>
                  </div>
                  <h3>{product.description}</h3>
                </div>
                <div className="right-side">
                  <div className="title">
                    <h1>Avaliações</h1>
                    <p onClick={handleScrollLeft}>Ver descrição</p>
                  </div>
                  <div>
                    <h3>Ainda não há nenhuma avaliação</h3>
                  </div>
                </div>
              </div>
        </div>

        <div className='container relational-products'>
          <h1>Você também pode gostar de:</h1>
          <ProductRow category="men's clothing"/>
        </div>
          </>
        }
      <Footer />
    </>
  )
}