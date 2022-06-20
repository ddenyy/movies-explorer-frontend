import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className='footer__line'></div>
        <nav className='footer__list'>
          <p className="footer__date">&copy;{new Date().getFullYear()}</p>
          <li className='footer__item'>
            <a href='https://practicum.yandex.ru/profile/web/' target='_blank' className='footer__link'>Яндекс.Практикум</a>
          </li>
          <li className='footer__item'>
            <a href='https://github.com/ddenyy' target='_blank' className='footer__link'>Github</a>
          </li>
          <li className='footer__item'>
            <a href='https://vk.com/ddenios' target='_blank' className='footer__link'>VK</a>
          </li>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;