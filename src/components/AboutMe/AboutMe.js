import React from 'react';
import './AboutMe.css';
import '../AboutProject/AboutProject.css';
import myPhoto from '../../images/myPhoto.jpg';
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className='about-me'>
      <div className='about-me__content'>
        <h2 className='about-project__title'>Студент</h2>
        <div className='about-project__border'></div>
        <div className='about-project__info about-project__info_position_aboutme'>
          <article className='about-project__article about-project__article_position_aboutme'>
            <h2 className='about-me__title_position_article'>Денис</h2>
            <h2 className='about-project__subtitle about-project__subtitle_position_aboutme'>front-end разработчик 20 лет</h2>
            <p className='about-project__text about-project__text_aboutme'>Я родился в Ярославле, обучаюсь в Санкт-Петербурге по программе программной инженерии. Я люблю читать литературу, а ещё увлекаюсь боксом, велопрогулками. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами, продолжая учёбу в вузе.</p>
            <nav className='about-me__list'>
              <li className='about-me__item'>
                <a href='https://vk.com/ddenios' target='_blank' className='about-me__link'>VK</a>
              </li>
              <li className='about-me__item'>
                <a href='https://github.com/ddenyy' target='_blank' className='about-me__link'>GitHub</a>
              </li>
            </nav>
          </article>
          <article className='about-project__article about-project__article_type_photo'>
            <img src={myPhoto} alt='Denis Osipov' className='about-me__photo'/>
          </article>
        </div>
      <Portfolio/>
      </div>
    </section>
  );
}

export default AboutMe;