// Styles
import './styles.css';

// React Hooks
import { useRef, useEffect } from 'react';

export const Banner = () => {
  const refferenceWidth = useRef<HTMLInputElement>(null);
  const reffereceController = useRef<HTMLInputElement>(null);

  const handleImageBanner = (indexBanner: number) => {
    const controllerElement: HTMLInputElement | any = reffereceController.current?.children;

    if(refferenceWidth.current != null) {
      refferenceWidth.current.scrollLeft = refferenceWidth.current.offsetWidth * indexBanner;
    }

    handleControllerBanner(controllerElement, indexBanner)
  }

  const handleControllerBanner = (ref: any, index: any) => {
    Array.from(ref).forEach((element: HTMLInputElement | any) => {
      if(element.classList.contains('active')) {
        element.classList.remove('active')
      } else {
        ref[index].classList.add('active')
      }
    })
  }

  const images = [ "https://loja.simply.app.br/arquivo_back/159/banner/9339d46a6eedc7974a71734d736e89ff20230311110047.webp", "https://loja.simply.app.br/arquivo_back/159/banner/3a3505a359d111e5d4f028c1bafc5e9f20230310172343.webp" ]

  useEffect(() => {
    handleImageBanner(0)
  }, [])

  return (
    <div className="container-section__banner">
      <div className="image-section__banner" ref={ refferenceWidth }>
        {
          images.map((image, index) => {
            return <img src={ image } alt="banner" key={ index }/>
          })
        }
      </div>
      <div className="controller-section__banner" ref={ reffereceController }>
        {
          images.map((image, index) => {
            return <div className={ `controller-button__banner ${image}` } key={ index } onClick={ () => handleImageBanner(index) }></div>
          })
        }
      </div>
    </div>
  )
}