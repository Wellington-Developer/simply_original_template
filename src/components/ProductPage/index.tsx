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
import { ModalInstallments } from './ModalInstallments';
import { Skeleton } from '@mui/material';
import { Popup } from '../Popup';

export const ProductPage = () => {
  const colorProduct = [
    { id: 1, name: 'Verde' },
    { id: 2, name: 'Vermelho' },
    { id: 3, name: 'Rosa' },
    { id: 4, name: 'Florido' },
  ];

  const sizeProduct = [
    { id: 1, name: 'P' },
    { id: 2, name: 'M' },
    { id: 3, name: 'G' },
    { id: 4, name: 'XG' },
  ];

  const images = ["https://loja.simply.app.br/arquivos_produtos/159/71468/cde93a9826ac6a605d98acbfe0faed3f20230407234705.jpeg", "https://loja.simply.app.br/arquivos_produtos/159/71468/cde93a9826ac6a605d98acbfe0faed3f20230407234705.jpeg"]

  const options = { style: 'currency', currency: 'BRL' }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  const refferenceImage = useRef(null)
  const refWidth = useRef(null)
  const refferenceController = useRef(null)
  const [contProduct, setContProduct] = useState(1);
  const param = useParams()
  const [product, setProduct] = useState<any>()
  const [size, setSize] = useState<any>(sizeProduct[0].name)
  const [color, setColor] = useState<any>(colorProduct[0].name)
  const [openModal, setOpenModal] = useState<any>(false)
  const { addProductToCart, showPopup } = useContext(GlobalContext)

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const handleScrollLeft = () => {
    const evaluationSection = document.getElementById('avaliacao');
    evaluationSection.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleScrollRight = () => {
    const descriptionSection = document.getElementById('info-desc');
    descriptionSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlusProductCart = () => {
    let productHandled = contProduct
    setContProduct(++productHandled)
  }

  const handleMinusProductCart = () => {
    let productHandled = contProduct
    if(productHandled <= 1) {
      productHandled = 1
    } else {
      setContProduct(--productHandled)
    }
  }
  const fetchProduct = () => {
    fetch(`https://fakestoreapi.com/products/${param.id}`)
      .then(r => r.json())
      .then(jsn => setProduct(jsn))
  }

  const handleImage = (index) => {
    const controllerElement: HTMLInputElement | any = refferenceController.current?.children;

    if (index > 0) {
      refferenceImage.current.scrollLeft = (refferenceImage.current.offsetWidth * index) + 24;
    } else {
      refferenceImage.current.scrollLeft = 0
    }

    handleControllerBanner(controllerElement, index)
  }

  const setFirstImage = (index) => {
    if (refferenceController.current != null) {
      handleImage(index)
    }
  }

  const handleControllerBanner = (ref: any, index: any) => {
    Array.from(ref).forEach((element: HTMLInputElement | any) => {
      if (element.classList.contains('active')) {
        element.classList.remove('active')
      } else {
        ref[index].classList.add('active')
      }
    })
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    setFirstImage(0)
  }, [product])

  return (
    <>
      <Header />
      {
        product ?
          (<>
            <Popup message="Produto adicionado ao carrinho" show={showPopup} />
            <div className="container container-product__page">
              <div className="content-product__page">
                <div className="leftside-product__page" ref={refferenceImage} >
                  {
                    images && images.map((image, index) => {
                      return <img src={image} alt="product image" key={index} />
                    })
                  }
                </div>
                <div className="bottom-images" ref={refferenceController}>
                  {
                    images && images.map((image, indexed) => {
                      return <img src={image} alt="product image" key={indexed} onClick={() => handleImage(indexed)} />
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
                      <a href="#avaliacao">
                        <p>(1 avaliação)</p>
                      </a>
                    </div>

                    <div className="description-product__page">
                      <p>{product.description}</p>

                      <a onClick={handleScrollRight}>Ver informações do produto</a>
                    </div>
                  </div>

                  <div className="buy-product__page">
                    <div className="price-product__page">
                      <h1>{formatNumber.format(product.price * contProduct - (5 * contProduct))}</h1>
                      <p>{formatNumber.format(product.price * contProduct)}</p>
                    </div>

                    <div className="discount-product__page">
                      <p>Você economiza R$ 5,00</p>
                    </div>

                    <div className="freight">
                      <div className="item-frete">
                        <img src={CardIcon} alt="frete.description" />
                        <h1>10x sem juros no cartão de crédito.
                          <h3 onClick={handleOpenModal}>Ver parcelas</h3>
                          {
                            openModal && <ModalInstallments price={product.price * contProduct} handleOpen={handleOpenModal} />
                          }
                        </h1>
                      </div>
                      <div className="item-frete">
                        <img src={PaymentPix} alt="frete.description" />
                        <h1>10% de desconto ({formatNumber.format(product.price - (10 * product.price / 100) - 5)}) no pix!</h1>
                      </div>
                    </div>

                    <div className="select-product__page">
                      <div className="size-product__page">
                        <p>Cor:</p>
                        <select value={color} onChange={e => setColor(e.target.value)}>
                          {
                            colorProduct.map((item, index) => (
                              <option value={item.name} key={index}>{item.name}</option>
                            ))
                          }
                        </select>
                      </div>

                      <div className="size-product__page">
                        <p>Tamanho:</p>
                        <select value={size} onChange={e => setSize(e.target.value)}>
                          {
                            sizeProduct.map((item, index) => (
                              <option value={item.name} key={index}>{item.name}</option>
                            ))
                          }
                        </select>
                      </div>

                      <div className="quantity-product__page">
                        <p>Quantidade</p>
                        <div className="infoquantity-product__page">
                          <AiOutlineMinusCircle onClick={handleMinusProductCart} />
                          <h3>{contProduct}</h3>
                          <AiOutlinePlusCircle onClick={handlePlusProductCart} />
                        </div>
                      </div>
                    </div>

                    <div className="buttonbuy-product__page">
                      <button onClick={() => addProductToCart(product.id, product.title, contProduct, size, color, product.price)}>
                        <img src={Cart} alt="cart" />
                        Adicionar</button>
                      <button id="button-wpp"><a href={`https://wa.me//556281470582?text=Olá, desejo comprar o produto: ${product.title}.%0d%0aQuantidade: ${contProduct}.%0d%0aCor: ${color}%0d%0aTamanho: ${size}%0d%0aPreço Total: ${formatNumber.format(product.price * contProduct)}`}><AiOutlineWhatsApp />Compra rápida pelo whatsapp</a></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="container-info__products" ref={refWidth}>
                <div className="left-side" id="info-desc">
                  <div className="title" >
                    <h1>Descrição</h1>
                    <p onClick={handleScrollLeft}>Ver avaliações</p>
                  </div>
                  <h3>{product.description}</h3>
                </div>
                <div className="right-side" id="avaliacao">
                  <div className="title">
                    <h1>Avaliações</h1>
                    <p onClick={handleScrollRight}>Ver descrição</p>
                  </div>
                  <div>
                    <h3>Ainda não há nenhuma avaliação</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className='container relational-products'>
              <h2>Você também pode gostar:</h2>
              <ProductRow category="men's clothing" />
            </div>
          </>)
          :
          (
            <>
            <div className="container container-product__page">
              <div className="content-product__page">
                <div className="leftside-product__page" ref={refferenceImage} >
                  <Skeleton variant="rectangular" width={700} height={600} />
                </div>
                <div className="rightside-product__page">
                  <div className="bradcrumb">
                    <Skeleton variant="rectangular" width={64} height={14} />
                  </div>

                  <div className="info-product__page">
                    <div className="evaluation">
                      <div className="icons-star">
                      <Skeleton variant="rectangular" width={54} height={14} />
                      </div>
                    </div>
                  </div>

                  <div className="buy-product__page">
                    <div className="price-product__page">
                    <Skeleton variant="rectangular" width={20} height={14} />
                    </div>

                    <div className="discount-product__page">
                    <Skeleton variant="rectangular" width={30} height={14} />
                    </div>

                    <div className="freight">
                      <div className="item-frete">
                      <Skeleton variant="rectangular" width={24} height={24} />
                      <Skeleton variant="rectangular" width={40} height={14} />
                      </div>
                    </div>

                    <div className="select-product__page">
                      <div className="size-product__page">
                        <Skeleton variant="rectangular" width={30} height={12} />
                      </div>

                      <div className="size-product__page">
                      <Skeleton variant="rectangular" width={44} height={14} />
                      </div>

                      <div className="quantity-product__page">
                      <Skeleton variant="rectangular" width={34} height={14} />
                      </div>
                    </div>

                    <div className="buttonbuy-product__page">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="container-info__products" ref={refWidth}>
                <div className="left-side" id="info-desc">
                  <div className="title" >
                    <Skeleton variant="rectangular" width={24} height={14} />
                  </div>
                </div>
                <div className="right-side" id="avaliacao">
                  <div>
                    <h3>Ainda não há nenhuma avaliação</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className='container relational-products'>
              <h2>Você também pode gostar:</h2>
              <ProductRow category="men's clothing" />
            </div>
          </>
          )

      }
      <Footer />
    </>
  )
}