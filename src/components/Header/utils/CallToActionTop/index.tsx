// Styles
import './styles.css';


// Data
import { infoTextCallToAction } from "./Utils/data"

export const CallToActionTop = () => {
  return (
    <div className="container-info__action">
      {
        infoTextCallToAction && <a href={infoTextCallToAction.link}>{infoTextCallToAction.text}</a>
      }
    </div>
  )
}