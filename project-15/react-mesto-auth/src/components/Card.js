import React from 'react';
import NoFoto from '../images/nofoto.png';

import CurrentUserContext from '../contexts/CurrentUserContext';

const Card = (props) => {
  const item = props.itemCard;
  const onCardClick = props.onCardClick;
  const handleLikeClick = props.onCardLike;
  const handleDeleteClick = props.onCardDelete;

  // подписка на контент
  const user = React.useContext(CurrentUserContext);
  // определеяем, своя ли фото
  // console.log(item)
  // console.log('owner: ', item.owner,' userid:', user.id);
  const isOwn = !(item.owner === user.id);
  // определяем, есть ли свой лайк
  const trueLike = item.likes.some(elem => elem === user.id);

  return (
    <article className="foto__card" >
      <button
        className={`foto__trash ${isOwn && 'foto__trash_disabled'}`}
        type="button"
        aria-label="Удалить"
        onClick={(evt) => { handleDeleteClick(evt, item) }}>
      </button>
      <div
        className="foto__image"
        style={{ backgroundImage: `url(${item.link}), url(${NoFoto})` }}
        onClick={(evt) => { onCardClick(evt, item) }}>
      </div>
      <div className="foto__info">
        <h3 className="foto__text">{item.name}</h3>
        <div className="foto__mark">
          <button
            className={`foto__like ${(trueLike) && 'foto__like_plus'}`}
            onClick={(evt) => { handleLikeClick(evt, item) }}
            type="button"
            aria-label="Нравится">
          </button>
          <span className="foto__count">{item.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;







