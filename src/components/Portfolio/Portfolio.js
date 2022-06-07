import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <article className='portfolio'>
      <div className='portfolio__content'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <nav className='portfolio__list'>
          <li className='portfolio__item'>
            <p className='portfolio__link'>Статичный сайт</p>
            <a className='portfolio__button' href='https://ddenyy.github.io/how-to-learn/' target='_blank'></a>
          </li>
          <li className='portfolio__item'>
            <p className='portfolio__link'>Адаптивный сайт</p>
            <a className='portfolio__button' href='https://ddenyy.github.io/russian-travel/' target='_blank'></a>
          </li>
          <li className='portfolio__item'>
            <p className='portfolio__link' to=''>Одностраничное приложение</p>
            <a className='portfolio__button' href='https://mesto.frontend.nomoredomains.work/sign-in' target='_blank'></a>
          </li>
        </nav>
      </div>
    </article>
  );
}

export default Portfolio;