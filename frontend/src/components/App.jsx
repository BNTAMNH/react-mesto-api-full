import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import api from "../utils/api.js";
import * as apiAuth from "../utils/apiAuth.js";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [history])

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]); 

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleAddPlaceSubmit(data) {
    api.setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegisterSubmit(email, password) {
    apiAuth.register(email, password)
      .then((res) => {
        setInfoToolTipOpen(true);
        setIsSucces(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipOpen(true);
        setIsSucces(false);
      })
  }

  function handleLoginSubmit(email, password) {
    apiAuth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipOpen(true);
        setIsSucces(false);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          email = {email}
          onSignOut = {handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"  
            loggedIn = {loggedIn}
            component = {Main}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            cards = {cards}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
          />

          <Route path="/sign-in">
            <Login onLogin={handleLoginSubmit} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegisterSubmit} />
          </Route>
          
          <Route path="*">
            { loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
          </Route>
        </Switch>
        <Footer />
      </div>

      <EditProfilePopup 
        isOpen = {isEditProfilePopupOpen} 
        onClose = {closeAllPopups}
        onUpdateUser = {handleUpdateUser} 
      />

      <AddPlacePopup
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onAddPlace = {handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onUpdateAvatar = {handleUpdateAvatar}
      />

      <PopupWithForm
        name = 'confirm'
        onClose = {closeAllPopups}
        title = 'Вы уверены?'
        buttonText='Да'
      >
      </PopupWithForm>

      <ImagePopup 
        card = {selectedCard}
        onClose = {closeAllPopups}
      />

      <InfoToolTip
        isOpen = {isInfoToolTipOpen}
        onClose = {closeAllPopups}
        isSucces = {isSucces}
      />

  </CurrentUserContext.Provider>
  );
}

export default App;
