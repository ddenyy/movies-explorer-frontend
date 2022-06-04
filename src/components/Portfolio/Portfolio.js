import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  return (
    <article className='portfolio'>
      <div className='portfolio__content'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <nav className='portfolio__list'>
          <li className='portfolio__item'>
            <Link className='portfolio__link' to=''>Статичный сайт</Link>
            <button className='portfolio__button'></button>
          </li>
          <li className='portfolio__item'>
            <Link className='portfolio__link' to=''>Адаптивный сайт</Link>
            <button className='portfolio__button'></button>
          </li>
          <li className='portfolio__item'>
            <Link className='portfolio__link' to=''>Одностраничное приложение</Link>
            <button className='portfolio__button'></button>
          </li>
        </nav>
      </div>
    </article>
  );
}

export default Portfolio;