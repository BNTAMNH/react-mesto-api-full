import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const titleRef = useRef('');
  const linkRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value
    });
    titleRef.current.value = '';
    linkRef.current.value = '';
  }

  return (
    <PopupWithForm
        name = 'add'
        isOpen = {props.isOpen}
        onClose = {props.onClose}
        onSubmit = {handleSubmit}
        title = 'Новое место'
        buttonText='Сохранить'
        >
         <input
          ref={titleRef}
          type="text"
          name="popup__title"
          required
          className="popup__input popup__input_type_title"
          id="title"
          minLength="2"
          maxLength="30"
          placeholder="Название"
        />
        <span className="popup__input-error title-error"></span>
        <input
          ref={linkRef}
          name="popup__photo-link"
          required
          className="popup__input popup__input_type_photo-link"
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error link-error"></span>
      </PopupWithForm>
  )
}