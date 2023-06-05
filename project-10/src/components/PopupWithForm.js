// компонент вывода попапов редактирования данных и удаления карточки
import React from 'react';

const PopupWithForm = (props) => {

  return (
    <section className={`popup ${props.name} ${(props.isOpen) && 'popup_opened'}`} onClick={props.onClose}>
      <div className={`popup__container ${props.name}__container`}>
        <button
          type="button"
          aria-label="Закрыть окно"
          className={`popup__btn-close  ${props.name}__btn-close `}
          onClick={props.onClose}
        ></button>
        <h2 className={`popup__title ${props.name}__title`}>{props.title}</h2>
        <form
          className={`popup__form ${props.name}__form`}
          name={`${props.name}__form`}
          noValidate>
          {props.children}
        </form>
      </div>
    </section>
  )

}

export default PopupWithForm;
