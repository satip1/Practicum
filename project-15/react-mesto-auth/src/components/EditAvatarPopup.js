import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditAvatarPopup = (props) => {

  const avatarRef = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
    // avatarRef.current.value = '';
  }

  // обновляем ввод только после предыдущего удачного запроса на запись новой аватарки
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="editavatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnName='Сохранить'>
      <label>
        <input
          type="url"
          name="editavatar__about"
          id="fotouser"
          className="popup__input"
          placeholder="Ссылка на фото пользователя"
          required
          ref={avatarRef} />
        <span className="popup__error fotouser-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
