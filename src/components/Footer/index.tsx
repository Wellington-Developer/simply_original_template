// Styles
import { Link } from 'react-router-dom'
import './styles.css'
import { useState, useRef, useEffect, useContext } from 'react'
import { FaInstagram } from 'react-icons/fa';
import { BiLogoFacebook } from 'react-icons/bi'
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
        if (refferenceWidth.current.offsetWidth <= 600) {
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

    const [showLinks, setShowLinks] = useState(false)
    const [showLinks2, setShowLinks2] = useState(false)
    const [showLinks3, setShowLinks3] = useState(false)
    const [showLinks4, setShowLinks4] = useState(false)
    const [ deskTopLinks, setDesktopLinks ] = useState(true)

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

    const removeIconInDesktopScreen = () => {
        if(refferenceWidth.current.offsetWidth >= 600) {
            setDesktopLinks(true)
        } else {
            setDesktopLinks(false)
        }
    }

    useEffect(() => {
        handleFooterMenu()
        removeIconInDesktopScreen()
    }, [])


    return (
        <div className="container-footer" ref={refferenceWidth}>
            <div className="submenu">
                <div className="box-footer" onClick={!deskTopLinks ? toggleLinks : undefined}>
                    <div className="top-footer">
                        <h1 >Institucional</h1>
                        {
                            !deskTopLinks && <div>
                            {
                                showLinks ?
                                    (<IoIosArrowUp />) :
                                    (<IoIosArrowDown />)
                            }
                        </div>
                        }
                    </div>
                    {
                        showLinks &&
                        <ul>
                            <Link to="/politica-privacidade">
                                <li>Politicas de Privacidade</li>
                            </Link>
                        </ul>
                    }
                </div>
                <div className="box-footer" onClick={!deskTopLinks ? toggleLinks2 : undefined}>
                    <div className="top-footer">
                        <h1 >Categorias</h1>
                        {
                            !deskTopLinks && <div>
                            {
                                showLinks2 ?
                                    (<IoIosArrowUp />) :
                                    (<IoIosArrowDown />)
                            }
                        </div>
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
                    <div className="top-footer" onClick={!deskTopLinks ? toggleLinks3 : undefined}>
                        <h1>Contatos</h1>
                        {
                            !deskTopLinks && <div>
                            {
                                showLinks3 ?
                                    (<IoIosArrowUp />) :
                                    (<IoIosArrowDown />)
                            }
                        </div>
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
                    <div className="top-footer" onClick={!deskTopLinks ? toggleLinks4 : undefined}>
                        <h1 >Redes Sociais</h1>
                        {
                            !deskTopLinks && <div>
                            {
                                showLinks4 ?
                                    (<IoIosArrowUp />) :
                                    (<IoIosArrowDown />)
                            }
                        </div>
                        }
                    </div>
                    {
                        showLinks4 &&
                        <ul>
                            <a href="www.google.com" target='blank' id="face"><BiLogoFacebook /></a>
                            <a href="www.google.com" target='blank'><FaInstagram /></a>
                        </ul>
                    }
                </div>
            </div>
            <div className="logotipo">
                {
                    cnpjData.cnpj ?
                        (
                            <div>{cnpjData.cnpj}</div>
                        ) :
                        (
                            <div>Todos os direitos reservados.</div>
                        )
                }
                <img src={logoSimply} alt="logotipo simply - todos os direitos reservados" />
            </div>
        </div>
    )
}