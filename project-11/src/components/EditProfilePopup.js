import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = (props) => {

  // подписались на контекст
  const user = React.useContext(CurrentUserContext);
  // переменным состояния нужно задать начальное начение, иначе неуправляемый компонент
  const [name, setName] = React.useState(' ');
  const [description, setDescription] = React.useState(' ');

  // задаем значения полей
  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user, props.isOpen]);

  // обработчик изменения в input
  const handleChangeInput = (evt) => {
    if (evt.target.name === 'name') setName(evt.target.value)
    else setDescription(evt.target.value);
  }

  // обработчик сабмита
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="editprofile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnName='Сохранить'>
      <label>
        <input
          type="text"
          name="name"
          id="user"
          className="popup__input popup__input_user"
          placeholder="Ваше имя"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeInput}
        />
        <span className="popup__error user-error"></span>
      </label>
      <label>
        <input
          type="text"
          name="description"
          id="about"
          className="popup__input popup__input_about"
          placeholder="Чем занимаетесь"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeInput}
        />
        <span className="popup__error about-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;















