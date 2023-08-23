// Styles
import { useContext, useState } from 'react';
import './styles.css'
import { GlobalContext } from '../../../context/GlobalContext';
import { Link } from 'react-router-dom';

export const Menu = () => {
  const global = useContext(GlobalContext);
  const [ showSubcategories, setShowSubcategories ] = useState(false)

  const handleSubcategoriesTrue = () => {
    setShowSubcategories(true)
  }

  const handleSubcategoriesFalse = () => {
    setShowSubcategories(false)
  }

  return (
    <nav className="menu">
      <div className="list">
        {
          global.allCategories && <>
            <ul className="list">
              {global.allCategories.map((item, index) => {
                return <div key={index}>
                  <Link to={`/category/${item}`}>
                    <li onMouseEnter={ handleSubcategoriesTrue } onMouseLeave={ handleSubcategoriesFalse }>{item}</li>
                  </Link>
                </div>
              })}
            </ul>
          </>
        }
        {
          showSubcategories &&
          <div className='subcategories' onMouseEnter={ handleSubcategoriesTrue } onMouseLeave={ handleSubcategoriesFalse }>
            <li>Subcategoria 1</li>
            <li>Subcategoria 2</li>
            <li>Subcategoria 3</li>
          </div>
        }
      </div>
    </nav>
  )
}