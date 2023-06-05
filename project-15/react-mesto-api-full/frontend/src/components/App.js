import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

import AvatarPath from '../images/avatar.jpg';
import { api } from '../utils/Api';
import { setRegister, getAuthorization, getValidToken } from '../utils/Authapi';
import CurrentUserContext from '../contexts/CurrentUserContext';

const App = () => {

  // переменные состояния для попапов редактирования аватарки и профиля, добавления картинки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  // переменная состояния для выбора картинки
  const [selectedCard, setSelectedCard] = React.useState({ card: {}, isOpenImagePopup: false });

  // переменные состояния попапов входа и регистрации
  const [isInfoToolTip, setIsInfoToolTip] = React.useState(false);
  const [isInfoResult, setIsInfoResult] = React.useState(false);

  // перемещаемся по страницам
  const history = useHistory();

  // глобальный контекст пользователя
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Загрузка ...',
    about: 'Загрузка ...',
    avatar: AvatarPath,
    id: '',
  });

  // есть ли регистрация пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  // в cards массив данных карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    if (!loggedIn) return;
    Promise.all([api.getUserData(), api.getInitCard()])
      .then(([userData, cardData]) => {
        setCurrentUser({
          name: userData.user.name,
          about: userData.user.about,
          avatar: userData.user.avatar,
          id: userData.user._id,
        });
        setCards(cardData);
        // console.log('Обновление ', loggedIn)
      })
      .catch(err => console.log('Ошибка: ', err))
  }, [loggedIn])

  React.useEffect(() => {
    checkToken();
  })

  // обработчик лайков карточки
  const handleCardLike = (evt, card) => {
    const trueLike = card.likes.some(item => item === currentUser.id);
    api.changeLikeCardStatus(card._id, !trueLike)
      .then((newCard) => {
        setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => console.log('Ошибка: ', err));
  }

  // удаление карточки
  const handleCardDelete = (evt, card) => {
    // console.log('карточка удалена ', card.name);
    api.deleteCurrentCard(card._id)
      .then((res) => { setCards((cards) => cards.filter((item) => !(item === card))); })
      .catch(err => console.log('Ошибка: ', err));
  }

  // обработчик нажатия на аватарке, открытие попапа редактирования аватарки
  const handleEditAvatarClick = (evt) => {
    setIsEditAvatarPopupOpen(true);
  }

  // обработчик нажатия на редактировании, открытие попапа редактирования
  const handleEditProfileClick = (evt) => {
    setIsEditProfilePopupOpen(true);
  }

  // обработчик нажатия на добавлении карточки, открытие попапа добавления карточки
  const handleAddPlaceClick = (evt) => {
    setIsAddPlacePopupOpen(true);
  }

  // обработчик нажатия на карточке, открытие попапа полноэранного просмотра карточки
  const handleCardClick = (evt, item) => {
    setSelectedCard({ card: item, isOpenImagePopup: true });
  }

  // закрытие всех попапов
  const closeAllPopups = () => {
    if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false);
    if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false);
    if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false);
    if (selectedCard.isOpenImagePopup) setSelectedCard({ card: {}, isOpenImagePopup: false });
    if (isInfoToolTip) setIsInfoToolTip(false);
  }
  // закрытие попапов по клику на оверлее и крестике
  const closeClickOnOverley = (evt) => {
    if (evt.target === evt.currentTarget) closeAllPopups()
  }

  // закрытие попапов по esc
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoToolTip;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  // проверка наличия и валидности токена
  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    // console.log('Проверка токена ', token);
    if (token) {
      getValidToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.user.email);
          history.push('/');
        })
        .catch((res) => {
          setIsInfoResult(false);
          setIsInfoToolTip(true);
          console.log(res);
          // localStorage.removeItem('jwt');
          history.push('/sign-in');
        })
    }
  }

  // обработчик сабмита формы редактирования аватарки пользователя
  const handleUpdateAvatar = (avatar) => {
    api.recordNewAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          id: res._id,
        })
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err));
  }

  // обработчик сабмита формы редактирования профиля пользователя
  const handleUpdateUser = (name, description) => {
    api.setProfileSave(name, description)
      .then((res) => {
        setCurrentUser({
          name: res.user.name,
          about: res.user.about,
          avatar: res.user.avatar,
          id: res.user._id,
        })
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err));

  }

  // обработчик сабмита формы добавления карточки
  const handleAddPlaceSubmit = (place, link) => {
    api.recordNewCard(place, link)
      .then((res) => {
        console.log("res ", res);
        setCards([ ...cards, res.card,]);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err));
  }

  // обработчик сабмита формы регистрации
  const handleRegSubmit = (email, pass) => {
    setRegister(email, pass)
      .then((res) => {
        return new Promise(resolve => setTimeout(resolve, 250));
      })
      .then(() => { handleAuthSubmit(email, pass) })
      .catch((res) => {
        console.log("Ошибка регистрации ", res);
        setIsInfoResult(false);
        setIsInfoToolTip(true);
      });
  }

  // обработчик сабмита формы авторизации
  const handleAuthSubmit = (email, pass) => {
    getAuthorization(email, pass)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserEmail(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((res) => {
        console.log("Ошибка авторизации ", res);
        setIsInfoResult(false);
        setIsInfoToolTip(true);
      });
  }

  // обработчик выхода из аккаунта
  const handleGoOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail("");
    history.push('/sign-in');
  }

  return (
    <div className="wrap">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={userEmail}
          onExit={handleGoOut}
        />
        <Switch>
          <Route path='/sign-in'>
            <Login
              onLogin={handleAuthSubmit} />
          </Route>
          <Route path='/sign-up'>
            <Register
              onReg={handleRegSubmit} />
          </Route>

          <ProtectedRoute
            exact path='/'
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            cards={cards} />

          <Route>
            <Redirect to="/sign-in" />
          </Route>
        </Switch>

        {/* попап редактирования аватарки */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeClickOnOverley}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* попап редактирования данных профиля  */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeClickOnOverley}
          onUpdateUser={handleUpdateUser}
        />

        {/* попап добавления новой карточки  */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeClickOnOverley}
          onAddNewCard={handleAddPlaceSubmit}
        />

        {/* попап полноэкранного просмотра фото  */}
        <ImagePopup
          image={selectedCard}
          onClose={closeClickOnOverley}
        />

        <InfoTooltip
          isOpen={isInfoToolTip}
          isResult={isInfoResult}
          onClose={closeClickOnOverley}
        />

      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
