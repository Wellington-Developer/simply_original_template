// Styles
import { useContext, useState } from 'react';
import './styles.css'
import { GlobalContext } from '../../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.nav className="menu"
    transition={{ duration: 0.1 }}>
      <motion.div className="list"
      transition={{ duration: 0.1 }}>
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
      </motion.div>
    </motion.nav>
  )
}