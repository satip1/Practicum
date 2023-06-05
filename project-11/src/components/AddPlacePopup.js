import React from 'react';
import PopupWithForm from './PopupWithForm';


const AddPlacePopup = (props) => {

  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  // обновляем значения полей value
  React.useEffect(() => {
    setPlace('');
    setLink('');
  }, [props.isOpen]);

  // обработчик инпутов
  const handleChangeInput = (evt) => {
    if (evt.target.name === 'addcard__name') setPlace(evt.target.value)
    else setLink(evt.target.value);
  }

  // обработчик сабмита формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddNewCard(place, link);
  }

  return (
    <PopupWithForm
      name="addcard"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnName='Сохранить'>
      <label>
        <input
          type='text'
          name="addcard__name"
          id="place"
          className="popup__input"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={place}
          onChange={handleChangeInput}
        />
        <span className="popup__error place-error"></span>
      </label>
      <label>
        <input
          type="url"
          name="addcard__about"
          id="href"
          className="popup__input"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangeInput}
        />
        <span className="popup__error href-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;












