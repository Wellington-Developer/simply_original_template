// Styles
import { GlobalContext } from '../context/GlobalContext';
import { ProductInput } from './ProductInput';
import './styles.css';

import { useContext, useState } from 'react';

export const InputSearch = () => {
  const [ data, setData ] = useState('')
  const { allProducts } = useContext(GlobalContext);
  const products = []

  const handleChange = (e) => {
    setData(e.target.value);
  }

  allProducts && allProducts.forEach((item) => products.push([item.title, item.id, item.image, item.price]))
  
  const filteredProducts = products.filter((item) => item[0].toLocaleLowerCase().includes(data.toLocaleLowerCase()))


  return (
    <div className="container-input__search">
      <div className="content-input__seach">
        <form>
          <input
            type="text"
            placeholder="Pesquisar produto"
            onChange={ handleChange } 
            value={ data }
          />
        </form>
      </div>

      <div className="container-product__search">
        {
          data && filteredProducts.map((item) => {
            return <ProductInput title={item[0]} id={item[1]} image={item[2]} price={item[3]} />
          })
        }
      </div>
    </div>
  )
}