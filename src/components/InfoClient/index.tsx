// Styles
import './styles.css';

// React Components
import { ButtonNext } from './utils/ButtonNext';

// React Hooks
import { useRef } from 'react';
import { FormStepOne } from './utils/FormStepOne';
import { FormStepTwo } from './utils/FormStepTwo';
import { useNavigate } from 'react-router-dom';

export const InfoClient = () => {
  const refferenceScreen = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const handleNextStep = () => {
    if(refferenceScreen.current != null) {
      refferenceScreen.current.scrollLeft += refferenceScreen.current.offsetWidth + 12;
    }
  }

  const handlePrevStep = () => {
    if(refferenceScreen.current != null) {
      refferenceScreen.current.scrollLeft -= refferenceScreen.current.offsetWidth + 12;
    }
  }

  const handleLocalStorageUserActive = () => {
    localStorage.setItem("user-active", "ativo")
    navigate('/')
    window.location.reload()
  }

  return (
    <div className="container-info__client container" ref={ refferenceScreen }>
      <div className="introduction-info__client">
        <div className="box-shadow">
          <h1>Parece ser a sua primeira vez aqui.</h1>
          <p>Preencha com suas informações. Fique tranquilo, faremos isso apenas uma vez!</p>
          <div className="button" onClick={ handleNextStep }>
            <ButtonNext title="Proximo" />
          </div>
        </div>
      </div>

      <div className="step-one__client">
        <div className="box-shadow">
          <h1>Deixe-nos te conhecer melhor</h1>
          <p>Insira seu nome e Whatsapp</p>
          <FormStepOne />
          <div className="button">
            <div onClick={ handlePrevStep }>
              <ButtonNext title="Anterior" />
            </div>
            <div onClick={ handleNextStep }>
              <ButtonNext title="Proximo" />
            </div>
          </div>
        </div>
      </div>

      <div className="step-two__client">
        <div className="box-shadow">
          <h1>Envio</h1>
          <p>Onde podemos entregar sua mercadoria?</p>
          <FormStepTwo />
          <div className="button">
            <div onClick={ handlePrevStep }>
              <ButtonNext title="Anterior" />
            </div>
            <div onClick={ handleLocalStorageUserActive }>
              <ButtonNext title="Completar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}