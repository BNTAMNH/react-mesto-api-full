function ImagePopup({ card, onClose }) {
  
  return (
    <div className={`popup popup_type_photo ${card && 'popup_opened'}`}>
      <figure className="popup__view">
        <img src={card?.link} alt={card?.name} className="popup__photo" />
        <figcaption className="popup__caption">{card?.name}</figcaption>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );

}

export default ImagePopup;