// компонент попапа входа и регистрации
import React from 'react';
import infoOk from '../images/info-ok.png';
import infoNo from '../images/info-no.png';

const InfoTooltip = (props) => {

  const textTitle = props.isResult ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Поробуйте еще раз';
  const picture = props.isResult ? infoOk : infoNo;

  return (
    <section className={`popup ${(props.isOpen) && 'popup_opened'}`} onClick={props.onClose}>
      <div className="popup__container popup__container_info">
        <button className="popup__btn-close" onClick={props.onClose}></button>
        <div className="popup__image" style={{ backgroundImage:`url(${picture})`}}></div>
        <p className="popup__title popup__title_info" >{textTitle}</p>
      </div>
    </section>
  )
}

export default InfoTooltip;
















