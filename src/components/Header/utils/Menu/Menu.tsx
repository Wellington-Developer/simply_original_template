// Styles
import { useContext } from 'react';
import './styles.css'
import { GlobalContext } from '../../../context/GlobalContext';
import { Link } from 'react-router-dom';

export const Menu = () => {
  const global = useContext(GlobalContext);
  return (
    <nav className="menu">
      {
        global.allCategories && <>
          <ul>
            {global.allCategories.map((item, index) => {
              return <div key={index}>
                <Link to={`/category/${item}`}>
                  <li>{item}</li>
                </Link>
              </div>
            })}
          </ul>
        </>
      }
    </nav>
  )
}