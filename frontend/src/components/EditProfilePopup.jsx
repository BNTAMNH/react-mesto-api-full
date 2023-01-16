import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
    name = 'edit'
    isOpen = {props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    title = 'Редактировать профиль'
    buttonText='Сохранить'
    >
      <input
        type="text"
        value={name || ''}
        onChange={handleNameChange}
        name="name"
        required
        className="popup__input popup__input_type_name"
        id="name"
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error name-error"></span>
      <input
        type="text"
        value={description || ''}
        onChange={handleDescriptionChange}
        name="description"
        required
        className="popup__input popup__input_type_about-me"
        id="about"
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error about-error"></span>
    </PopupWithForm>
  )
}