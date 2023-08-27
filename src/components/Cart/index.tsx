// Styles
import './styles.css';

// React Components
import { InfoClient } from "../InfoClient";
import { ProductCart } from './utils/ProductsCart';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const userAtive = localStorage.getItem("user-active");
  const { cart } = useContext(GlobalContext);
  let soma = 0;
  const [productPrice, setProductPrice] = useState(0)
  const [discount, setDiscount] = useState();
  const [hasDiscount, setHasDiscount] = useState(0)
  const [ dataClient, setDataClient ] = useState<any>()
  const [ addressClient, setAddressClient ] = useState<any>()
  const [ messageProduct, setMessageProduct ] = useState<any>([])
  const [ infoClient, setInfoClient ] = useState<any>()
  const [ infoAddress, setInfoAddress ] = useState<any>()
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

    const info = `\n\n
      Olá, meu nome é ${dataClient.nome}\nE gostaria de fazer o pedido abaixo:
      \n\n
    `

    const addressInfo = `
    \n\n
      Endereço de entrega:
      ${addressClient.city}\n
      ${addressClient.cep}\n
      ${addressClient.street}\n
      ${addressClient.number}\n
      \n\n
    `

    setInfoAddress(addressInfo)
    setInfoClient(info)

    
    for(numero; numero < infoPurchase.length; numero++) {
      const messageProductFor = `
      \n\n
      ----------------------------------
      \n*Produto*: ${infoPurchase[numero].nameProduct}
      \n*Preço*: R$ ${infoPurchase[numero].totalPrice / infoPurchase[numero].qtd}
      \n*Quantidade*: ${infoPurchase[numero].qtd}
      \n*Cor*: ${infoPurchase[numero].color}
      \n*Tamanho*: ${infoPurchase[numero].size}
      \n*Preço Total*: R$ ${infoPurchase[numero].totalPrice}
      ----------------------------------
      \n\n
      `
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
    <div className="container">
        <Link to="/">
          <span className="home">← Voltar para home</span>
        </Link>
      {userAtive ? (
        <div className="container-section__cart">
          
        <div className="left-side__cart">
        {
          dataClient &&
          <h4>Olá novamente, {dataClient.nome}</h4>  
        }
          <h2>Produtos adicionados</h2>
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
        </div>

        <div className="right-side__cart">
          <h2>Resumo do pedido</h2>
          <div className="product-discount__cart">
            <input
              type="text"
              placeholder="Cupom de desconto"
              onChange={ handleChangeDiscount }
            />
          </div>

          <div className="quicly-resume__cart">
            <h4>Desconto:</h4>
            <h3>R$ { hasDiscount }</h3>
          </div>

          <div className="quicly-resume__cart">
            {
              cart.length <= 0 ?
              (<h1>R$ 0</h1>) :
              (<div className="resume-cart">
                <a href={`https://wa.me//556281470582?text=${infoClient}\n\n${messageProduct}\n\n${infoAddress}`}>
                  <button onClick={messageToClient}>Finalizar pedido</button>
                </a>
                
                <h1>R$ { (productPrice - hasDiscount)}</h1>
              </div>)
            }
          </div>
        </div>
      </div>
    ) : (
      <InfoClient />
    )}
    </div>
  )
}