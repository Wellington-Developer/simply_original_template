// Styles
import './styles.css';

export const Input = () => {
  return (
    <form className="left-side__input">
      <input 
        type="text"
        placeholder="Nome completo"
      />

      <div className="address-side__input">
        <input 
          type="text"
          placeholder="CEP"
        />

        <input 
          type="text"
          placeholder="Número"
        />
      </div>

      <input 
        type="text"
        placeholder="Endereço"
      />

      <input 
        type="text"
        placeholder="Cidade"
      />

      <input 
        type="text"
        placeholder="Complemento"
      />
    </form>
  )
}