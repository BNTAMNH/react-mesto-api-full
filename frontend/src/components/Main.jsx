import { useContext } from "react";
import Card from "../components/Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {

  const currentUser = useContext(CurrentUserContext); 
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <img
              src={currentUser.avatar}
              alt="Фото профиля"
              className="profile__photo"
            />
            <button
              onClick={props.onEditAvatar}
              className="profile__photo-btn"
              type="button"
              aria-label="Редактировать аватар"
            ></button>
          </div>
          <div className="profile__data">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about-me">{currentUser.about}</p>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-btn"
              type="button"
              aria-label="Редактировать профиль"
            ></button>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-btn"
          type="button"
          aria-label="Добавить фото"
        ></button>
      </section>
      <section className="places" aria-label="Место">
        <ul className="places__list">
          {props.cards.map((item) => {
            return (
              <Card 
                card = {item}
                onCardClick = {props.onCardClick}
                key = {item._id}
                onCardLike = {props.onCardLike}
                onCardDelete = {props.onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;