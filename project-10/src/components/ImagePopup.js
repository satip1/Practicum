// компонент вывода попапа полноэкранного режима просмотра
import React from 'react';
// import noFoto from '../images/nofoto.png';

const ImagePopup = (props) => {

  const item = props.image.card;
  const isOpen = props.image.isOpenImagePopup;

  return (
    <section
      className={`popup fullimage ${(isOpen) && 'popup_opened'}`}
      onClick={props.onClose}>
      <div className="popup__fullimage-container fullimage__container">
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__btn-close fullimage__btn-close"
          onClick={props.onClose}></button>
        <img src={item.link} alt={item.name} className="popup__fullimage fullimage__image" />
        <h2 className="popup__fullimage-text fullimage__text">{item.name}</h2>
      </div>
    </section>
  )
}

export default ImagePopup;
