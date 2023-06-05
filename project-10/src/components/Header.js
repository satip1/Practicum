// компонент заголовка
// в logoPath задаем путь к файлу логотипа
import React from 'react';
import logoPath from '../images/logo_white_svg.svg';

const Header = () => {
     return (
      <header className="logo">
        <img src={logoPath} alt="Логотип Место" className="logo__img" />
      </header>
    )
}

export default Header;
