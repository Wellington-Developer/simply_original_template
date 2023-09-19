// Styles
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';
import { GlobalContext } from '../context/GlobalContext';
import { ProductInput } from './ProductInput';
import './styles.css';
import { useNavigate } from 'react-router-dom';

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

  
const history = useNavigate();


  return (
    <>
        <div className="container-input__search container">
          <Link to="/">
            <h1 onClick={ () => history(-1)}>← Voltar</h1>
          </Link>
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
          {
            filteredProducts.length == 20 ?
            (<h3>Faça uma pesquisa rápida!</h3> ) : 
            (<h3>Produtos encontrados: {filteredProducts.length}</h3>)
          }

          <div className="container-product__search">
            {
              data && filteredProducts.map((item) => {
                return <ProductInput title={item[0]} id={item[1]} image={item[2]} price={item[3]} />
              })
            }
          </div>
        </div>
      <Footer />
    </>
  )
}