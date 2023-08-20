// Styles
import { GlobalContext } from '../context/GlobalContext';
import './styles.css';

// React Hooks
import { useState, useContext } from 'react';

export const PopupTermsAccept = () => {
  const [ inputData, setInputData ] = useState('');
  const { termsUserHasBeenAccepted } = useContext(GlobalContext)
  
  const handleLocalStorageSendMessage = () => {
    setInputData('aceito')
    localStorage.setItem("termos", JSON.stringify(inputData));
  }

  return (
    <div className={termsUserHasBeenAccepted != null ? 'fechar' : ''}>
      <div className="section-popup">
        <h1>Usamos cookies para personalizar conteúdos e melhorar a sua experiência. Ao navegar neste site, você concorda com nossa política de privacidade.</h1>
        <button onClick={ handleLocalStorageSendMessage }>Aceitar e Fechar</button>
      </div>
    </div>
  )
}