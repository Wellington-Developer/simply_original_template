// Styles
import './styles.css';

// React Hooks
import { useState, useEffect, useContext } from "react";

// React Icons
import { BiSearchAlt2, BiCartAlt } from 'react-icons/bi';

// Framer Motion
import { motion } from 'framer-motion';
import { useAnimate, stagger } from "framer-motion";

// React Components
import { Menu } from './utils/Menu/Menu';
import { MenuToggle } from './utils/MenuToggle';
import { Link } from 'react-router-dom';
import { InputSearch } from '../InputSerch';
import { GlobalContext } from '../context/GlobalContext';


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


    const scope = useMenuAnimation(isOpen);

    const handleInputIsOpen = () => {
      setInputIsOpen(!inputIsOpen);
    }

    return (
        <>
          <div className="principal-container__header">
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
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <Link to="/">
                  {
                    inputIsOpen && <InputSearch />
                  }
                  {
                    !inputIsOpen && <h1 className="name_interprise">Simply</h1>
                  }
                </Link>
                </motion.div>
            </div>
            <div className="right-side__header">
              <div className="right-icon__header">
                <Link to="/search">
                  <BiSearchAlt2 onClick={ handleInputIsOpen } />
                </Link>
                <Link to="/cart">
                  <BiCartAlt />
                </Link>
                <div className="contador">
                  {cart.length}
                </div>
              </div>
            </div>
        </div>
        </>
    )
}