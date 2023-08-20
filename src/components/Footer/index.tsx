// Styles
import { Link } from 'react-router-dom'
import './styles.css'
import { useState, useRef, useEffect, useContext } from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

// Data
import { cnpjData } from './data';

// Images
import logoSimply from '../../assets/logo.png';
import { GlobalContext } from '../context/GlobalContext';

export const Footer = () => {
    const refferenceWidth = useRef(null);
    const global = useContext(GlobalContext)

    const handleFooterMenu = () => {
        if(refferenceWidth.current.offsetWidth <= 600) {
            setShowLinks(false)
            setShowLinks2(false)
            setShowLinks3(false)
            setShowLinks4(false)
        } else {
            setShowLinks(true)
            setShowLinks2(true)
            setShowLinks3(true)
            setShowLinks4(true)
        }
    }

    const [ showLinks, setShowLinks ] = useState(false)
    const [ showLinks2, setShowLinks2 ] = useState(false)
    const [ showLinks3, setShowLinks3 ] = useState(false)
    const [ showLinks4, setShowLinks4 ] = useState(false)

    const toggleLinks = () => {
        setShowLinks(!showLinks)
    }

    const toggleLinks2 = () => {
        setShowLinks2(!showLinks2)
    }

    const toggleLinks3 = () => {
        setShowLinks3(!showLinks3)
    }

    const toggleLinks4 = () => {
        setShowLinks4(!showLinks4)
    }

    useEffect(() => {
        handleFooterMenu()

    }, [])

    return (
        <div className="container-footer" ref={refferenceWidth}>
            <div className="submenu">
                <div className="box-footer" onClick={toggleLinks}>
                    <div className="top-footer">
                        <h1 >Institucional</h1>
                        {
                            showLinks ?
                            (<IoIosArrowUp />) :
                            (<IoIosArrowDown />)
                        }
                    </div>
                    {
                        showLinks &&
                        <ul>
                            <Link to="/politica-privacidade">
                                <li>Politicas de Privacidade</li>
                            </Link>
                            <Link to="/cadastrar-produto">
                                <li>Cadastrar produto</li>
                            </Link>
                        </ul>
                    }
                </div>
                <div className="box-footer" onClick={toggleLinks2}>
                    <div className="top-footer">
                        <h1 >Categorias</h1>
                        {
                            showLinks2 ?
                            (<IoIosArrowUp />) :
                            (<IoIosArrowDown />)
                        }
                    </div>
                    {
                        showLinks2 &&
                        <ul>
                            {
                                global.allCategories &&
                                global.allCategories.map((item, index) => {
                                    return <Link to={`/category/${item}`} key={index}>
                                        <li>{item}</li>
                                    </Link>
                                })
                            }
                        </ul>
                    }
                </div>
                <div className="box-footer">
                    <div className="top-footer">
                        <h1 onClick={toggleLinks3}>Contatos</h1>
                        {
                            showLinks3 ?
                            (<IoIosArrowUp />) :
                            (<IoIosArrowDown />)
                        }
                    </div>
                    {
                        showLinks3 &&
                        <ul>
                            <li>Rua 3, equina com R-2, lote 4, sala 34, Goiânia/GO</li>
                            <li>(62) 99992-5073</li>
                            <li>(62) 99307-7681</li>
                        </ul>
                    }
                </div>
                <div className="box-footer midia-social">
                <div className="top-footer">
                        <h1 onClick={toggleLinks4}>Redes Sociais</h1>
                        {
                            showLinks4 ?
                            (<IoIosArrowUp />) :
                            (<IoIosArrowDown />)
                        }
                    </div>
                    {
                        showLinks4 &&
                        <ul>
                            <a href="www.google.com" target='blank'><FaFacebookF /></a>
                            <a href="www.google.com" target='blank'><FaInstagram /></a>
                        </ul>
                    }
                </div>
            </div>
            <div className="logotipo">
                    <img src={ logoSimply } alt="logotipo simply - todos os direitos reservados" />
            </div>

            <div className="info-interprise">
                <div>
                    {
                        cnpjData.cnpj ?
                        (
                            <div>{cnpjData.cnpj}</div>
                        ) :
                        (
                            <div>Todos os direitos reservados.</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}