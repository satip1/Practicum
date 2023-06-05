// компонент футера
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text">&copy; {year} Mesto Russia</p>
    </footer>
  )
}

export default Footer;
