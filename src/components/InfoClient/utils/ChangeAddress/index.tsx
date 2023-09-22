import { useState, useEffect } from 'react';
import "./styles.css";
import { useNavigate } from 'react-router-dom';

export const ChangeAddress = () => {
  const [ newAddressCity, setNewAddressCity ] = useState<any>()
  const [ newAddressCep, setNewAddressCep ] = useState<any>()
  const [ newAddressStreet, setNewAddressStreet ] = useState<any>()
  const [ newAddrressNumber, setNewAddressNumber ] = useState<any>()
  const navigate = useNavigate()

  const getOldAddress  = () => {
    const addr = localStorage.getItem("fullAddressClient")
    const newAddr = JSON.parse(addr)
    
    if(addr) {
      setNewAddressCity(newAddr.city)
      setNewAddressStreet(newAddr.street)
      setNewAddressCep(newAddr.cep)
      setNewAddressNumber(newAddr.number)
    }
  }

  const handleChangeInput = () => {
    const addressClient = {
      city: newAddressCity,
      cep: newAddressCep,
      number: newAddrressNumber,
      street: newAddressStreet
    }

    localStorage.setItem('fullAddressClient',
    JSON.stringify(addressClient))

    navigate("/cart")
  }


  useEffect(() => {
    getOldAddress()
  }, [])

  return (
    <div className="info-change__addr">
        <div className="info">
          <h1>Editar informações</h1>
          <p>Caso não haja alteração em algum campo, ele permanecerá com os dados antigos relacionados ao mesmo!</p>
        </div>

          <form>
          <label>
            Cidade:
            <input 
              type="text"
              placeholder={newAddressCity}
              onChange={ (e) => setNewAddressCity(e.target.value) }
              value={newAddressCity}
            />
          </label>

          <label>
            Rua:
            <input 
              type="text"
              placeholder={newAddressStreet}
              onChange={ (e) => setNewAddressStreet(e.target.value) }
              value={newAddressStreet}
            />
          </label>

          <label>
            CEP:
            <input 
              type="text"
              placeholder={newAddressCep}
              onChange={ (e) => setNewAddressCep(e.target.value) }
              value={newAddressCep}
            />
          </label>

          <label>
            Número:
            <input 
              type="text"
              placeholder={newAddrressNumber}
              onChange={ (e) => setNewAddressNumber(e.target.value) }
              value={newAddrressNumber}
            />
          </label>
          <button onClick={handleChangeInput}>Editar dado</button>
      </form>
    </div>
  )
}