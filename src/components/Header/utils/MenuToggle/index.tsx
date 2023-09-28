import './styles.css';
import { useState, useEffect } from 'react';


const Path = (props: any) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="black"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }: any) => {

  const [ scrolled, setScrolled ] = useState<any>(false)

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
    <button className={`btn-left ${scrolled ? 'onScroll': ''}`} onClick={toggle}>
      <svg width="23" height="18" viewBox="0 0 23 18">
        <Path
          d="M 2 2.5 L 20 2.5"
          className="top"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" }
          }}
        />
        <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
        <Path
          d="M 2 16.346 L 20 16.346"
          className="bottom"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" }
          }}
        />
      </svg>
    </button>
  )
};
