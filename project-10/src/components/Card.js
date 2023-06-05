import React from 'react';
import NoFoto from '../images/nofoto.png';

const Card = (props) => {
 const item = props.itemCard;
 const onCardClick = props.onCardClick;

  return (
    <>
        <button className="foto__trash" type="button" aria-label="Удалить"></button>
        <div alt={item.name} className="foto__image"
          style={{ backgroundImage: `url(${item.link}), url(${NoFoto}) ` }}
          onClick = {(evt) =>{onCardClick(evt, item)}}></div>
        <div className="foto__info">
          <h3 className="foto__text">{item.name}</h3>
          <div className="foto__mark">
            <button className="foto__like" type="button" aria-label="Нравится"></button>
            <span className="foto__count">{item.likes.length}</span>
          </div>
        </div>
    </>
  )
}

export default Card;







