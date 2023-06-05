import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


import AvatarPath from '../images/avatar.jpg';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';

const App = () => {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ card: {}, isOpenImagePopup: false });

  const [currentUser, setCurrentUser] = React.useState({
    name: 'Загрузка ...',
    about: 'Загрузка ...',
    avatar: AvatarPath,
    id: '',
  });

  // в cards массив данных карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitCard()])
      .then(([userData, cardData]) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id,
        });
        setCards(cardData);
      })
      .catch(err => console.log('Ошибка: ', err))
  }, [])

  // обработчик лайков карточки
  const handleCardLike = (evt, card) => {
    const trueLike = card.likes.some(item => item._id === currentUser.id);
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
  }
  // закрытие попапов по клику на оверлее и крестике
  const closeClickOnOverley = (evt) => {
    if (evt.target === evt.currentTarget) closeAllPopups()
  }

  // закрытие попапов по esc
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

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
  }, [isOpen])

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
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          id: res._id,
        })
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err));

  }

  // обработчик сабмита формы добавления карточки
  const handleAddPlaceSubmit = (place, link) => {
    api.recordNewCard(place, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err));

  }

  return (
    <div className="wrap">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
          cards={cards}
        />
        <Footer />

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

        <PopupWithForm
          name="delCard"
          title="Вы уверены?"
          btnName='Да'
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
