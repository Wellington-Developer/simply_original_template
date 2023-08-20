// Styles
import { GlobalContext } from '../context/GlobalContext';
import './styles.css';

// React Hooks
import { useState, useContext } from 'react';

export const AddNewProduct = () => {
  const { getLocalStorageProducts } = useContext(GlobalContext);

  const [ title, setTitle ] = useState()
  const [ price, setPrice ] = useState()
  const [ description, setDescription ] = useState()
  const [ image, setImage ] = useState()
  const [ category, setCategory ] = useState()

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleChangeImage = (e) => {
    setImage(e.target.value);
  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleSubmit = () => {
    const newArray = {
      title, 
      price, 
      description, 
      image, 
      category
    }

    const oldInfo = JSON.parse(localStorage.getItem('produtos'))
    
    if(oldInfo === null) {
      localStorage.setItem("produtos",
      JSON.stringify([newArray]))
    } else {
      localStorage.setItem(
        'produtos',
        JSON.stringify([...oldInfo, newArray])
      )
    }

    getLocalStorageProducts(oldInfo)
  }

  return (
    <div className="container-cadastro__produto">
      <h1>test</h1>
      <input
        placeholder="Digite o nome do produto"
        type="text"
        onChange={ handleChangeTitle }
      />

      <input
        type="text"
        placeholder="Digite o preço do produto"
        onChange={ handleChangePrice }
      />

      <input
        type="text"
        placeholder="Digite a descrição do produto"
        onChange={ handleChangeDescription }
      />

      <input
        type="text"
        placeholder="Digite a url da imagem do produto"
        onChange={ handleChangeImage }
      />

      <input
        type="text"
        placeholder="Digite a categoria do produto"
        onChange={ handleChangeCategory }
      />

      <button onClick={ handleSubmit }>Enviar dados</button>
    </div>
  )
}