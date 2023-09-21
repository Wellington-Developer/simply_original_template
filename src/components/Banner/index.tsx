import './styles.css';
import { useRef, useEffect, useState } from 'react';

export const Banner = () => {
  const referenceWidth = useRef<HTMLInputElement>(null);
  const referenceController = useRef<HTMLInputElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://loja.simply.app.br/arquivo_back/159/banner/9339d46a6eedc7974a71734d736e89ff20230311110047.webp",
    "https://loja.simply.app.br/arquivo_back/159/banner/3a3505a359d111e5d4f028c1bafc5e9f20230310172343.webp"
  ];

  const handleImageBanner = (indexBanner: number) => {
    if (referenceWidth.current !== null) {
      referenceWidth.current.scrollLeft = referenceWidth.current.offsetWidth * indexBanner;
    }

    setCurrentIndex(indexBanner);
    handleControllerBanner(indexBanner);
  };

  const handleControllerBanner = (index: number) => {
    const controllerElements: HTMLInputElement | any = referenceController.current?.children;
    if (controllerElements) {
      Array.from(controllerElements).forEach((element: HTMLInputElement | any, i: number) => {
        if (i === index) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      handleImageBanner(nextIndex);
    }, 6000); // Trocar a cada 6 segundos (6000 ms)

    return () => {
      clearInterval(intervalId); // Limpar o intervalo quando o componente for desmontado
    };
  }, [currentIndex]);

  useEffect(() => {
    handleImageBanner(currentIndex);
  }, [currentIndex]);

  return (
    <div className="container-section__banner">
      <div className="image-section__banner" ref={referenceWidth}>
        {images.map((image, index) => {
          return <img src={image} alt="banner" key={index} />;
        })}
      </div>
      <div className="controller-section__banner" ref={referenceController}>
        {images.map((image, index) => {
          return (
            <div
              className={`controller-button__banner ${image} ${index === currentIndex ? 'active' : ''}`}
              key={index}
              onClick={() => handleImageBanner(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};