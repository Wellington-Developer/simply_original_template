// Styles
import './styles.css';

import { useEffect, useState } from 'react';


// Data
import { infoTextCallToAction } from "./Utils/data"

export const CallToActionTop = () => {
  const [scrolled, setScrolled] = useState<any>(false)
  const styledCallToAction = {
    display: scrolled ? 'none' : 'flex',
  }


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <div className="container-info__action" style={ styledCallToAction }>
      {
        infoTextCallToAction && <a href={infoTextCallToAction.link}>{infoTextCallToAction.text}</a>
      }
    </div>
  )
}