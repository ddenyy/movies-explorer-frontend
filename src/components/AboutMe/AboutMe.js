import React from 'react';
import './AboutMe.css';
import '../AboutProject/AboutProject.css';

function AboutMe() {
  return (
    <section className='aboutme'>
      <div className='aboutme__content'>
        <h2 className='aboutproject__title'>Студент</h2>
        <div className='aboutproject__border'></div>
        <div className='aboutproject__info aboutproject__info_position_aboutme'>
          <article className='aboutproject__article aboutproject__article_position_aboutme'>
            <h2 className='aboutme__title_position_article'>Денис</h2>
            <h2 className='aboutproject__subtitle'>front-end разработчик 20 лет</h2>
            <p className='aboutproject__text aboutproject__text_aboutme'>Я родился в Ярославле, обучаюсь в Москве по программе программной инженерии МИЭТ. Я люблю читать литературу, а ещё увлекаюсь боксом, велопрогулками. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами, продолжая учёбу в вузе.</p>
          </article>
          <article className='aboutproject__article aboutproject__article_type_photo'>
            <div className='aboutme__photo'></div> 
          </article>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;