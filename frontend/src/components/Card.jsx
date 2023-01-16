import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `place__like-btn ${isLiked && 'place__like-btn_active'}`
  )

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <li className="place">
      { isOwn && 
        <button 
          onClick={handleDeleteClick}
          className="place__trash-btn" 
          type="button" 
          aria-label="Удалить"
        ></button>
      }
      <img 
        src={card.link} 
        alt={card.name} 
        className="place__photo" 
        onClick={handleClick} 
        />
      <div className="place__caption">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;