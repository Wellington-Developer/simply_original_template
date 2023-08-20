// Styles
import './styles.css';

// React Context
import { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { AiFillStar } from 'react-icons/ai';
import { BiCartAdd } from 'react-icons/bi';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineWhatsApp } from 'react-icons/ai'
import { Popup } from '../Popup';
import { Testimonials } from '../Testimonials';

export const ProductPage = () => {
  const refWidth = useRef(null)
  const imageOffset = useRef(null)
  const { id } = useParams();
  const [ quantity, setQuantity ] = useState(0);
  const [ product, setProduct ] = useState<any>();
  const { allProducts, setProductToCart, showPopup } = useContext(GlobalContext);

  const filteredProduct = ( id ) => {
    if(allProducts) {
      const product = allProducts.filter((product) => product.id == id)
      setProduct(product)
    } 
  }

  const handleQuantityMinus = () => {
    if(quantity <= 0) {
      let quant = 0;
      setQuantity(quant)
    } else {
      let quant = quantity - 1
      setQuantity(quant)
    }
  }

  const handleQuantityPlus = () => {
    const quant = quantity + 1
    setQuantity(quant)
  }

  const handleScrollLeft = () => {
    refWidth.current.scrollLeft -= refWidth.current.offsetWidth;
  }

  const handleScrollRight = () => {
    refWidth.current.scrollLeft += refWidth.current.offsetWidth;
  }

  const handleImageOffsetlLeft = () => {
    imageOffset.current.scrollLeft -= (refWidth.current.offsetWidth + 100);
  }

  const handleImageOffsetRight = () => {
    imageOffset.current.scrollLeft += (refWidth.current.offsetWidth + 100);
  }

  useEffect(() => {
    filteredProduct(id)
  }, [allProducts])



  return (
    <div className="container-single__product">
      {
        product && product.map((product, index) => {
          return <div className="info-product__page" key={index}>
          <Popup message="Produto adicionado ao carrinho!" show={showPopup}/>
          <div className="container-img__product">
            <div className="left-side__content" ref={ imageOffset }>
              <img src={product.image}/>
              <img src={product.image} />
            </div>

            <div className="buttons">
              <button onClick={ handleImageOffsetlLeft }><AiOutlineArrowLeft /></button>
              <button onClick={ handleImageOffsetRight }><AiOutlineArrowRight /></button>
            </div>
          </div>
          <div className="right-side__content">
              <div className="price-section">
                <h3 id="price">R$ {product.price}</h3>
                <h4>{product.price - 5}</h4>
              </div>
              <span>{product.category}</span>
              <h1>{product.title}</h1>
              <div className="icons">
                  <div className="icons-content">
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                  </div>
                  <p>5 avaliações!</p>
              </div>
              <p>{product.description}</p>
              <div className="payment-method__info">
                  <div className="box-payment">10% de desconto para pagamento via PIX</div>
                  <div className="box-payment">10x sem juros no cartão de crédito (ver parcelas)</div>
              </div>
              <div className="select-inputs">
                  <select name="Cor">
                      <option value="color">Cor</option>
                      <option value="preto">Preto</option>
                      <option value="cinza">Cinza</option>
                      <option value="azul_marinho">Azul Marinho</option>
                      <option value="amarelo">Amarelo</option>
                  </select>
                  <select name="tamanho">
                      <option value="color">Material</option>
                      <option value="preto">P</option>
                      <option value="cinza">M</option>
                      <option value="azul_marinho">GG</option>
                      <option value="amarelo">XGG</option>
                  </select>

                  <div className="quantity">
                    <div className="top-side">
                      <p>Quantidade</p>
                    </div>
                    <div className="bottom">
                      <div className="left" onClick={ handleQuantityMinus }>
                        -
                      </div>
                      <div className="mid">
                        <h3>{ quantity }</h3>
                      </div>
                      <div className="right" onClick={ handleQuantityPlus }>
                        +
                      </div>
                    </div>
                  </div>
              </div>
              <div className="buttons">
                <button onClick={ () => setProductToCart(product.id) }>Adicionar ao carrinho<BiCartAdd /></button>
                <button id="wpp">Comprar pelo whatsapp<AiOutlineWhatsApp /></button>
              </div>
          </div>
      </div>
        })
      }

      <div className="bottom-side__products">
        {
          product && product.map((pro, index) => {
            return <div key={index} className="container-info__products" ref={refWidth}>
              <div className="left-side">
                <div className="title">
                  <h1>Descrição</h1>
                  <p onClick={handleScrollRight}>Ver avaliações</p>
                </div>
                <h3>{pro.description}</h3>
              </div>
              <div className="right-side">
                <div className="title">
                  <h1>Avaliações</h1>
                  <p onClick={handleScrollLeft}>Ver descrição</p>
                </div>
                <div>
                  <Testimonials />
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}