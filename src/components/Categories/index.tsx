// Styles
import './styles.css';

// React Hooks
import { useContext } from 'react';

// React Context Components
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';


export const Categories = () => {
    const global = useContext(GlobalContext);

    return (
        <div className="categories">
            {
                global.allCategories && <div className="categories-container__top">
                    {global.allCategories.map((item, index) => {
                        return <div key={index}>
                                <Link to={`/category/${item}`}>
                                    <div className="category-circle" >
                                    <div className="circle"></div>
                                            <p>{item}</p>
                                    </div>
                                </Link>
                        </div>
                    })}
                </div>
            }
        </div>
    )
}