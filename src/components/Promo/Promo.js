import React from 'react';
import './Promo.css';
import logo from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__content'>
        <img src={logo} alt='web - my word'  className='promo__logo'/>
        <article className='promo__article'>
          <h1 className='promo__title'>Учебный проект студента факультета  Веб-разработки</h1>
          <h2 className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя</h2>
          <a href='https://practicum.yandex.ru' target='_blank' className='promo__button'>Узнать больше</a>
        </article>
      </div>
    </section>
  );
}

export default Promo;