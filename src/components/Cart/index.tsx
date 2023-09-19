// Styles
import './styles.css';

// React Components
import { InfoClient } from "../InfoClient";
import { ProductCart } from './utils/ProductsCart';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { PaymentForm } from '../ProductPage/PaymentForm';
import { BsFillCartXFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const userAtive = localStorage.getItem("user-active");
  const { cart, resumeProduct, priceCart } = useContext(GlobalContext);
  let soma = 0;
  const [productPrice, setProductPrice] = useState(0)
  const [discount, setDiscount] = useState();
  const [hasDiscount, setHasDiscount] = useState(0)
  const [ dataClient, setDataClient ] = useState<any>()
  const [ addressClient, setAddressClient ] = useState<any>()
  const [ messageProduct, setMessageProduct ] = useState<any>([])
  const [ infoClient, setInfoClient ] = useState<any>()
  const [ infoAddress, setInfoAddress ] = useState<any>()
  const options = { style: 'currency', currency: 'BRL' }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  const [ modalCupom, setModalCupom ] = useState(false)
  const history = useNavigate();

  const backToOtherRoute = () => {
    history(-1);
  }

  const sumProductCart = () => {
    cart.map((productCart) => {
      soma += productCart.totalPrice
      setProductPrice(soma)
    })
  }

  const messageToClient = () => {
    const infoPurchase = []
    var numero = 0;
    
    cart.map((product) => {
      infoPurchase.push(product)
    })

    const array = []

    const info = `
      Olá, meu nome é ${dataClient.nome} e gostaria de fazer o pedido abaixo:%0d%0a
    `

    const addressInfo = `
    %0d%0aEndereço de entrega: ${addressClient.city}%0d%0aCEP: ${addressClient.cep}%0d%0a${addressClient.street}%0d%0aNumero: ${addressClient.number}%0d%0a*PREÇO TOTAL: ${productPrice}*%0d%0a*Metodo de pagamento*: ${resumeProduct.form}%0d%0a${resumeProduct.desc}%0d%0a
    `

    setInfoAddress(addressInfo)
    setInfoClient(info)

    
    for(numero; numero < infoPurchase.length; numero++) {
      const messageProductFor = `%0d%0a----------------------------------%0d%0a*Produto*: ${infoPurchase[numero].nameProduct}%0d%0a*Preço*: R$ ${infoPurchase[numero].totalPrice / infoPurchase[numero].qtd}%0d%0a*Quantidade*: ${infoPurchase[numero].qtd}%0d%0a*Cor*: ${infoPurchase[numero].color}%0d%0a*Tamanho*: ${infoPurchase[numero].size}%0d%0a*Preço Total*: ${formatNumber.format(resumeProduct.price)}%0d%0a*----------------------------------%0d%0a`
      array.push(messageProductFor)
    }
    
    const mes = []
    array.forEach((item) => {
      mes.push(item)
      setMessageProduct(mes)
    })
  }

  const handleChangeDiscount = (e: any) => {
    setDiscount(e.target.value)
    if (discount == "test") {
      setHasDiscount(5)
    } else {
      setHasDiscount(0)
    }
  }

  const getInfoLocalStorage = () => {
    const data = localStorage.getItem('infoClientName')
    const address = localStorage.getItem('fullAdressClient')
    setAddressClient(JSON.parse(address))
    setDataClient(JSON.parse(data))
  }

  useEffect(() => {
    sumProductCart()
    getInfoLocalStorage()
  }, [cart])

  return (
    <>
      {
        cart.length > 0 ? (<div className="container">
        <Link to="/">
          <span className="home">← Voltar</span>
        </Link>
      {userAtive ? (
        <div className="container-section__cart">
          
        <div className="left-side__cart">
        {
          dataClient &&
          <>
          <p>Estamos quase lá, {dataClient.nome}</p>  
          <h4>Me diga, como quer pagar?</h4>
          </>
        }
          <div className="pay_form">
            <PaymentForm price={productPrice - hasDiscount}/>
          </div>
        </div>

        <div className="right-side__cart">
          <div className="product-side__cart">
            {
              cart.length > 0 ?
              (
                cart.map((product, index) => {
                    return <ProductCart id={ product.id } qtd={ product.qtd } size={ product.size } color={ product.color } key={index}/>
                  })
                ) : (
                  <p>Adicione produtos ao carrinho.</p>
                  )
                }
          </div>

          <div className="quicly-resume__cart carted">
            {
              !hasDiscount && <p onClick={ () => setModalCupom(true) }>Inserir cupom de desconto</p>
            }

          {
            modalCupom && <div className="product-discount__cart">
            <div className="discount-cumpom">
              
              <input
                type="text"
                placeholder="Cupom de desconto"
                onChange={ handleChangeDiscount }
              />

              <button onClick={ () => setModalCupom(false) }>Confirmar</button>
            </div>
          </div>
          }

            {
              hasDiscount !== 0 && <>
                <p>Desconto aplicado:</p>
                <h3>R$ { hasDiscount }</h3>
              </>
            }
          </div>

          <div className="quicly-resume__cart">
            {
              cart.length <= 0 ?
              (<h1>R$ 0</h1>) :
              (<div className="resume-cart">
                <a href={`https://wa.me//556281470582?text=${infoClient}${messageProduct}${infoAddress}`}>
                  <button onClick={messageToClient}>Finalizar pedido</button>
                </a>
                
                {
                  resumeProduct &&
                    <h1>{formatNumber.format(priceCart)}</h1>
                }
              </div>)
            }
          </div>

        </div>
      </div>
    ) : (
      <InfoClient />
    )}
    </div>) :
        (
          <div className="until-cart">
            <div className="mid-until__cart">
                <p onClick={backToOtherRoute}>← Voltar</p>

                <div className="info-until__cart">
                  <h1>Seu carrinho está vazio 🥺</h1>
                  <BsFillCartXFill />
                </div>
            </div>
          </div>
        )
      }
    </>
  )
}