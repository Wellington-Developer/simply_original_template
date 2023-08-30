// Styles
import { GlobalContext } from '../../context/GlobalContext';
import './styles.css';

import { useContext, useEffect, useState } from 'react';

export const PaymentForm = ({ price }) => {
  const [parcela, setParcela] = useState<any>(2)
  const options = { style: 'currency', currency: 'BRL' }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  const [indexForm, setIndexForm] = useState(0)
  const { handleResumeProduct } = useContext(GlobalContext)

  const parcelaQtd = [
    { id: 1, name: 2 },
    { id: 2, name: 3 },
    { id: 3, name: 4 },
    { id: 4, name: 5 },
    { id: 4, name: 6 },
    { id: 4, name: 7 },
    { id: 4, name: 8 },
    { id: 4, name: 9 },
    { id: 4, name: 10 },
    { id: 4, name: 11 },
    { id: 4, name: 12 },
  ];

  const paymentForm = [
    {
      form: 'Pix',
      description: '10% de desconto',
      price: `${(price - (10 * price) / 100)}`,
      desc: `Desconto de 10% aplicado`
    },
    {
      form: 'Cartão de crédito',
      description: 'Sem juros',
      price: `${price}`,
      qtdPrice: `${price / parcela}`,
      desc: `${parcela}x de ${price / parcela}`
    },
    {
      form: 'Dinheiro',
      description: '',
      price: `${price}`,
      desc: ``
    },
    {
      form: 'Cartão de débito',
      description: '',
      price: `${price}`,
      desc: ``
    }
  ]

  const handleFormPayment = (i) => {
    setIndexForm(i)
    handleResumeProduct(paymentForm[i])
  }

  const handleParcela = () => {
    handleResumeProduct(paymentForm[indexForm])
  }

  useEffect(() => {
    handleParcela()
  }, [parcela])

  return (
    <div className="box-payment__form">
      {
        paymentForm.map((item, index) => {
          return <div className="box" key={index} onClick={() => handleFormPayment(index)}>
            <h1>{item.form}</h1>
          </div>
        })
      }

      {
        paymentForm[indexForm].form == "Cartão de crédito" ?
          (<div className="selected-method">
            <h1>Metodo selecionado:</h1>
            <div className="qtd">
              Quantidade de vezes a parcelar:
              <select onChange={e => setParcela(e.target.value)}>
                {
                  parcelaQtd.map((item, index) => (
                    <option value={item.name} key={index}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            <h3>{paymentForm[indexForm].form}</h3>
            <p>Valor: {parcela}x de {formatNumber.format(Number(paymentForm[indexForm].qtdPrice))}</p>
          </div>) 
          : 
          (
            <div className="selected-method">
              <h1>Metodo selecionado:</h1>
              <h3>{paymentForm[indexForm].form}</h3>
              <p>Valor: {formatNumber.format(Number(paymentForm[indexForm].price))}</p>
            </div>
          )
      }


    </div>
  )
}