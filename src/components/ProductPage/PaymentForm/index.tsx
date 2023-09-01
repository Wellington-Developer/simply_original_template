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
      desc: `- 10% de desconto aplicado`
    },
    {
      form: 'Crédito',
      description: 'Sem juros',
      price: `${price}`,
      qtdPrice: `${price / parcela}`,
      desc: `${parcela}x de ${formatNumber.format(price / parcela)}`
    },
    {
      form: 'Dinheiro',
      description: '',
      price: `${price}`,
      desc: ``
    },
    {
      form: 'Débito',
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
        paymentForm[indexForm].form == "Crédito" ?
          (<div className="selected-method">
            <h1>Qual quantidade de vezes que quer parcelar?</h1>
            <div className="qtd">
              <select onChange={e => setParcela(e.target.value)}>
                {
                  parcelaQtd.map((item, index) => (
                    <option value={item.name} key={index}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            <p>Total de parcelas: <h1>{parcela}x de {formatNumber.format(Number(paymentForm[indexForm].qtdPrice))} no cartão de {paymentForm[indexForm].form}</h1></p>
            <h3></h3>
          </div>) 
          : 
          (
            <div className="selected-method">
              <h1>Metodo selecionado:</h1>
              <h3>{paymentForm[indexForm].form}</h3>
              <p>Valor: {formatNumber.format(Number(paymentForm[indexForm].price))} {paymentForm[indexForm].desc && paymentForm[indexForm].desc}</p>
            </div>
          )
      }


    </div>
  )
}