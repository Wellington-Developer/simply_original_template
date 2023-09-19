// Styles
import { useEffect, useState } from 'react';
import './styles.css';
import { AiOutlineClose } from 'react-icons/ai'

export const ModalInstallments = ({ price, handleOpen }) => {
  const options = { style: 'currency', currency: 'BRL' }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  const [ parcelas, setParcelas ] = useState<any>()
  const prices = []
  const resumeInstallments = () => {
    for(let number = 2; number <= 12; number++) {
      prices.push(number)
    }
    setParcelas(prices)
  }
  
  useEffect(() => {
    resumeInstallments()
  }, [])

  return (
    <div className="container-modal__installments" >
      <h3 onClick={() => handleOpen(false)}><AiOutlineClose /></h3>
      {
        parcelas && parcelas.map((item, index) => {
          return <div className="line-parcela" key={index}>
            <h1>{item} vezes</h1>
            <h1>Sem juros</h1>
            <h1>{ formatNumber.format(price / item) }</h1>
          </div>
        })
      }
    </div>
  )
}