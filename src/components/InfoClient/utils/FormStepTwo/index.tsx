// React Hooks
import { useState, useEffect } from 'react'

export const FormStepTwo = () => {
  const [ cityClient, setCityClient ] = useState<any>()
  const [ cepClient, setCepClient ] = useState<any>()
  const [ addressClient, setAddressClient ] = useState<any>()
  const [ numberClient, setNumberClient ] = useState<any>()
  const [ fullAddressClient, setFullAddressClient ] = useState<any>([])

  useEffect(() => {
    setFullAddressClient({city: cityClient, cep: cepClient, street: addressClient, number: numberClient})

    localStorage.setItem('fullAdressClient',
    JSON.stringify(fullAddressClient))
  }, [cityClient, cepClient, addressClient, numberClient])

  return (
    <form action=""> 
      <input 
      value={cityClient}
      onChange={(e) => setCityClient(e.target.value)}
      type="text" 
      placeholder="Cidade"/>

      <input 
      value={cepClient}
      onChange={(e) => setCepClient(e.target.value)}
      type="text" 
      placeholder="CEP"/>

      <input 
      value={addressClient}
      onChange={(e) => setAddressClient(e.target.value)}
      type="text" 
      placeholder="Endereço"/>

      <input 
      value={numberClient}
      onChange={(e) => setNumberClient(e.target.value)}
      type="text" 
      placeholder="Número"/>
    </form>
  )
}