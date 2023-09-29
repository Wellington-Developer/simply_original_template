// Styles
import { GlobalContext } from '../context/GlobalContext';
import './styles.css';

// React Hooks
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'

export const PopupTermsAccept = () => {
  const [ inputData, setInputData ] = useState('');
  const { termsUserHasBeenAccepted } = useContext(GlobalContext)
  const [ modal, setModal ] = useState(true)
  
  const handleLocalStorageSendMessage = () => {
    setInputData('aceito')
    localStorage.setItem("termos", JSON.stringify(inputData));
    setModal(false)
  }

  return (
    <div className="container">
      {modal && <div className={termsUserHasBeenAccepted != null ? 'fechar' : ''}>
      <div className="section-popup">
        <h1>Usamos cookies para personalizar conteúdos e melhorar a sua experiência. Ao navegar neste site, você concorda com nossa <Link to="/politica-privacidade">política de privacidade</Link>.</h1>
        <button onClick={ handleLocalStorageSendMessage }>Aceitar</button>
      </div>
    </div>}
    </div>

  )
}