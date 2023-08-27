// React hooks
import { useEffect, useState } from 'react'

export const FormStepOne = () => {
  const [ nameClient, setNameClient ] = useState<any>();
  const [ whatsappClient, setWhatsappClient ] = useState<any>()
  const [ dataInfoClient, setDataInfoClient ] = useState<any>([])

  useEffect(() => {
    localStorage.setItem('infoClientName', 
      JSON.stringify(dataInfoClient)
    )
    setDataInfoClient({nome: nameClient, whatsapp: whatsappClient})
  }, [nameClient, whatsappClient])

  return (
    <form>
      <input
      value={ nameClient }
      onChange={ (e) => setNameClient(e.target.value) }
      type="text"
      placeholder="Nome"
      />

      <input
      value={ whatsappClient }
      onChange={ (e) => setWhatsappClient(e.target.value) }
      type="text"
      placeholder="Whatsapp"
      />
    </form>
  )
}