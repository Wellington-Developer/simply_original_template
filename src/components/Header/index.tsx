// Styles
import './styles.css';

// React Hooks
import { useState, useEffect, useContext } from "react";

// React Icons
import { BiSearchAlt2 } from 'react-icons/bi';

// Assets
import CartHeader from '../../assets/cart-header.svg';

// Framer Motion
import { motion } from 'framer-motion';
import { useAnimate, stagger } from "framer-motion";

// React Components
import { Menu } from './utils/Menu/Menu';
import { MenuToggle } from './utils/MenuToggle';
import { Link } from 'react-router-dom';
import { InputSearch } from '../InputSerch';
import { GlobalContext } from '../context/GlobalContext';
import { CallToActionTop } from './utils/CallToActionTop';

import LogoHeaderImg from '../../assets/logo-header.png';


function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      const menuAnimations: any = isOpen
        ? [
            [
              "nav",
              { transform: "translateX(0%)" },
              { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 }
            ],
            [
              "li",
              { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
              { delay: stagger(0.05), at: "-0.1" }
            ]
          ]
        : [
            [
              "li",
              { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
              { delay: stagger(0.05, { from: "last" }), at: "<" }
            ],
            ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }]
          ];
  
      animate([
        [
          "path.top",
          { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
          { at: "<" }
        ],
        ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
        [
          "path.bottom",
          { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
          { at: "<" }
        ],
        ...menuAnimations
      ]);
    }, [isOpen]);
  
    return scope;
  }

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [ inputIsOpen, setInputIsOpen ] = useState(false);
    const { cart } = useContext(GlobalContext);
    const [ scrolled, setScrolled ] = useState<any>(false)

    const scope = useMenuAnimation(isOpen);

    const headerStyle = {
      height: scrolled ? '70px' : '100px',
      transition: 'height 0.3s ease'
    };
  

    const handleInputIsOpen = () => {
      setInputIsOpen(!inputIsOpen);
    }

    useEffect(() => {
      const handleScroll = () => {
        // Verifica se a página foi rolada para baixo (scroll > 50px)
        const isScrolled = window.scrollY > 50;
        setScrolled(isScrolled);
      };
  
      // Adiciona o evento de rolagem
      window.addEventListener('scroll', handleScroll);
  
      // Remove o evento de rolagem ao desmontar o componente
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [])
    return (
        <>
        <CallToActionTop />
          <div className={`principal-container__header ${scrolled ? 'top-zero' : ''}`} style={headerStyle}>
            <div className="left-side__header">
                <div ref={scope}>
                    {
                      isOpen && 
                      <div onClick={() => setIsOpen(!isOpen)}>
                        <Menu />
                      </div>
                    }
                    <MenuToggle toggle={() => setIsOpen(!isOpen)}/>
                </div>
            </div>
            <div className="mid-side__header">
            <motion.div
            >
                <Link to="/">
                  {
                    inputIsOpen && <InputSearch />
                  }
                  {
                    !inputIsOpen && <h1 className="name_interprise">
                      <img src={LogoHeaderImg} />
                    </h1>
                  }
                </Link>
                </motion.div>
            </div>
            <div className="right-side__header">
              <div className="right-icon__header">
                <Link to="/search">
                  <BiSearchAlt2 onClick={ handleInputIsOpen } />
                  <p className="info-product__descr">Pesquisar</p>
                </Link>
                <Link to="/cart">
                  <img src={ CartHeader } />
                  <p className="info-product__descr">Carrinho</p>
                </Link>
                <Link to="/cart">
                  <div className="contador">
                    {cart.length}
                  </div>
                </Link>
              </div>
            </div>
        </div>
        </>
    )
}