import React from 'react';
import AvatarPath from '../images/avatar.jpg';
import Card from './Card';
import { api } from '../utils/Api';


const Main = (props) => {

  const [userName, setUserName] = React.useState('Загрузка ...');
  const [userDescription, setUserDescription] = React.useState('Загрузка ...');
  const [userAvatar, setUserAvatar] = React.useState(AvatarPath);
  const [cards, setCards] = React.useState([]);

  // инициализация профиля пользователя
  const initUserInfo = (res) => {
    setUserName(res.name);
    setUserDescription(res.about);
    setUserAvatar(res.avatar);
  }

  // запрос на серврер для инициализации профиля пользователя и карточек
  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitCard()])
      .then(res => {
        initUserInfo(res[0]);
        setCards(res[1]);
      })
      .catch(err => console.log('Что-то пошло нет так'))
  }, [])

  return (
    <>
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
                style={{ backgroundImage: `url(${userAvatar})` }}>
              </div>
              <button
                aria-label="Редактировать фото"
                className="profile__btn-avatar">
              </button>
            </div>
            {/* вывод профиля  */}
            <div className="profile__info">
              <div className="profile__heading">
                <h1 className="profile__title">{userName}</h1>
                <button type="button" aria-label="Редактировать профиль"
                  className="profile__btn-edit" onClick={props.onEditProfile}></button>
              </div>
              <h2 className="profile__text">{userDescription}</h2>
            </div>
            <button type="button" aria-label="Добавить"
              className="profile__btn-add" onClick={props.onAddPlace}>+</button>
          </section>
          {/* вывод галереи фото пользователя  */}
          <section className="foto">
            {cards.map((item, id) =>
              <article className="foto__card" key={id}>
                <Card itemCard={item} onCardClick={props.onCardClick} />
              </article>
            )}
          </section>

        </div>
      </main>
    </>
  )
}

export default Main;



