import React from 'react';
import './AboutProject.css'

function AboutProject () {
  return (
    <section className='about-project'>
      <div className='about-project__content'>
        <h2 className='about-project__title'>О проекте</h2>
        <div className='about-project__border'></div>
        <div className='about-project__info'>
          <article className='about-project__article'>
            <h2 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h2>
            <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </article>
          <article className='about-project__article'>
            <h2 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h2>
            <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </article>
        </div>
        <div className='about-project__meter'>
          <span className='about-project__line about-project__line_first about-project__line_color_green'>1 неделя</span>
          <span className='about-project__line about-project__line_second about-project__line_color_grey-black'>4 недели</span>
        </div>
        <div className='about-project__meter about-project__meter_type_subtitle'>
          <span className='about-project__line about-project__line_first about-project__line_color_grey'>front-end</span>
          <span className='about-project__line about-project__line_second about-project__line_color_grey'>backend</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;