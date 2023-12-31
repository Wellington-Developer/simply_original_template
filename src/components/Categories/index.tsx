// Styles
import './styles.css';

// React Hooks
import { useContext } from 'react';

// React Context Components
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';


export const Categories = () => {
    const { allCategories } = useContext(GlobalContext);

    return (
        <div className="categories">
            <div className="categories-container__top">
                {
                    allCategories.length == 0 ?
                        (
                            <div>
                                <div className="category-circle" >
                                    <div className="circle">
                                        <Skeleton animation="wave" variant="circular" width={60} height={60} />
                                    </div>
                                    <p>Carregando</p>
                                </div>
                            </div>
                        )
                        :
                        (
                            allCategories.map((item, index) => {
                                return <div key={index}>
                                    <Link to={`/category/${item}`}>
                                        <div className="category-circle" >
                                            <div className="circle">
                                                <img src="https://loja.simply.app.br/arquivos_produtos/159/71453/897dbd9795b60f8c7d9e7c6f6c0b78d420230408104139.webp" alt="product category" />
                                            </div>
                                            <p>{item}</p>
                                        </div>
                                    </Link>
                                </div>
                            })
                        )
                }
            </div>
        </div>
    )
}