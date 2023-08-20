// Styles
import './styles.css'
import { CSSTransition } from 'react-transition-group';

export const Popup = ({ message, show }) => {
  return (
    <CSSTransition in={show} timeout={500} classNames="popup" unmountOnExit>
      <div className="popup">{message}</div>
    </CSSTransition>
  );
};
