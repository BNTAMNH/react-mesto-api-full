import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const inputRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
    inputRef.current.value = '';
  } 

  return (
    <PopupWithForm
      name = 'avatar-edit'
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      title = 'Обновить аватар'
      buttonText='Сохранить'
      >
      <input
        ref={inputRef}
        name="popup__avatar-link"
        required
        className="popup__input"
        id="avatar"
        type="url"
        placeholder="https://somewebsite.com/someimage.jpg"
      />
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  )
}