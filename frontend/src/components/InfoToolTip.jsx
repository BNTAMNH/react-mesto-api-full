import failIcon from "../images/popup_fail.svg";
import succesIcon from "../images/popup_succes.svg"

export default function InfoToolTip(props) {
  return (
    <div className={`popup popup_type_infotooltip ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button 
          className="popup__close-btn"
          type="button"
          onClick={props.onClose}
        ></button>
        <img 
          className="popup__img-tooltip"
          src={props.isSucces ? succesIcon : failIcon}
          alt={props.isSucces ? "Регистрация прошла успешна" : "Регистрация не удалась"}
        />
        <h2 className="popup__title popup__title_type_tooltip">{props.isSucces ? 'Вы успешно зарегистрировались!': 'Что-то пошло не так. Попробуйте ещё раз!'}</h2>
      </div>
    </div>
  )
}