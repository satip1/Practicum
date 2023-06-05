// компонент заголовка
// в logoPath задаем путь к файлу логотипа
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/logo_white_svg.svg';

const Header = (props) => {
  let hrefTitle = '';
  let href = '';

  const location = useLocation();

  const onExit = () => {
    (location.pathname === '/') && props.onExit();
  }

  switch (location.pathname) {
    case '/sign-in':
      hrefTitle = 'Регистрация';
      href = '/sign-up'
      break;
    case '/sign-up':
      hrefTitle = 'Войти';
      href = '/sign-in'
      break;
    case '/':
      hrefTitle = 'Выйти';
      href = '#'
      break;
    default:
      hrefTitle = 'Регистрация';
      href = '/sign-up'
      break;
  }

  return (
    <header className="logo">
      <img src={logoPath} alt="Логотип Место" className="logo__img" />
      <div className="logo__actions">
        {props.email && <span>{props.email}</span>}
        <Link
          to={href}
          className="account__link"
          onClick={onExit}>
          {hrefTitle}
        </Link>
      </div>
    </header>
  )
}

export default Header;
