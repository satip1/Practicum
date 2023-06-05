import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ card: {}, isOpenImagePopup: false });

  const handleEditAvatarClick = (evt) => {
    setEditAvatarPopupOpen(true);
    // window.addEventListener('keydown', closeAllPopups);
  }

  const handleEditProfileClick = (evt) => {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = (evt) => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (evt, item) => {
    setSelectedCard({ card: item, isOpenImagePopup: true });
  }

  const closeAllPopups = (evt) => {
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setSelectedCard({ card: {}, isOpenImagePopup: false });
  }

  const closeClickOnOverley = (evt) => {
    if (evt.target === evt.currentTarget) closeAllPopups()
  }

  return (
    <>
      <div className="wrap">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          card={selectedCard}
          onCardClick={handleCardClick}
        />
        <Footer />

        {/* попап редактирования аватарки */}
        <PopupWithForm
          name="editavatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeClickOnOverley}
          children={
            <>
              <label>
                <input type="url" name="editavatar__about" id="fotouser" className="popup__input" placeholder="Ссылка на фото пользователя"
                  required />
                <span className="popup__error fotouser-error"></span>
              </label>
              <button type="submit" className="popup__btn-save popup__btn-save_disabled editavatar__btn-save"
                disabled>Сохранить</button>
            </>
          } />

        {/* попап редактирования данных профиля  */}
        <PopupWithForm
          name="editprofile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeClickOnOverley}
          children={
            <>
              <label>
                <input type="text" name="edit__name" id="user" className="popup__input popup__input_user" placeholder="Ваше имя" required
                  minLength="2" maxLength="40" />
                <span className="popup__error user-error"></span>
              </label>
              <label>
                <input type="text" name="edit__about" id="about" className="popup__input popup__input_about" placeholder="Чем занимаетесь" required
                  minLength="2" maxLength="200" />
                <span className="popup__error about-error"></span>
              </label>
              <button type="submit" className="popup__btn-save  editprofile__btn-save popup__btn-save_disabled"
                disabled>Сохранить</button>
            </>
          } />

        {/* попап добавления новой карточки  */}
        <PopupWithForm
          name="addcard"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeClickOnOverley}
          children={
            <>
              <label>
                <input type="text" name="addcard__name" id="place" className="popup__input" placeholder="Название" required
                  minLength="2" maxLength="30" />
                <span className="popup__error place-error"></span>
              </label>
              <label>
                <input type="url" name="addcard__about" id="href" className="popup__input" placeholder="Ссылка на картинку"
                  required />
                <span className="popup__error href-error"></span>
              </label>
              <button type="submit" className="popup__btn-save popup__btn-save_disabled addcard__btn-save"
                disabled>Сохранить</button>
            </>
          } />

        {/* попап полноэкранного просмотра фото  */}
        <ImagePopup
          image={selectedCard}
          onClose={closeClickOnOverley}
        />


        <PopupWithForm
          name="delCard"
          title="Вы уверены?"
          children={
            <>
              <button type="submit" className="popup__btn-save delCard__btn-save">Да</button>
            </>
          } />





      </div>
    </>
  );
}

export default App;
