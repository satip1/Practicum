import React from 'react';
import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';


const Main = (props) => {
  // в cards массив данных карточек
  const cards = props.cards;
  // подписались на контекст
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <div className="page">
        {/* вывод фото профиля  */}
        <section className="profile" >
          <div
            className="profile__img"
            onClick={props.onEditAvatar}>
            <div
              alt="Фото пользователя"
              className="profile__avatar"
              style={{ backgroundImage: `url(${user.avatar})` }}>
            </div>
            <button
              aria-label="Редактировать фото"
              className="profile__btn-avatar">
            </button>
          </div>
          {/* вывод профиля  */}
          <div className="profile__info">
            <div className="profile__heading">
              <h1 className="profile__title">{user.name}</h1>
              <button
                type="button"
                aria-label="Редактировать профиль"
                className="profile__btn-edit"
                onClick={props.onEditProfile}></button>
            </div>
            <h2 className="profile__text">{user.about}</h2>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__btn-add"
            onClick={props.onAddPlace}>+</button>
        </section>
        {/* вывод галереи фото пользователя  */}
        <section className="foto">
          {cards.map((item) =>
          (<Card
            key={item._id}
            itemCard={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />)
          )}
        </section>

      </div>
    </main>

  )
}

export default Main;



