import React from 'react';
import './AboutProject.css'

function AboutProject () {
  return (
    <section className='aboutproject'>
      <div className='aboutproject__content'>
        <h2 className='aboutproject__title'>О проекте</h2>
        <div className='aboutproject__border'></div>
        <div className='aboutproject__info'>
          <article className='aboutproject__article'>
            <h2 className='aboutproject__subtitle'>Дипломный проект включал 5 этапов</h2>
            <p className='aboutproject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </article>
          <article className='aboutproject__article'>
            <h2 className='aboutproject__subtitle'>На выполнение диплома ушло 5 недель</h2>
            <p className='aboutproject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </article>
        </div>
        <div className='aboutproject__meter'>
          <span className='aboutproject__line aboutproject__line_first aboutproject__line_green'>1 неделя</span>
          <span className='aboutproject__line aboutproject__line_second aboutproject__line_black'>4 недели</span>
        </div>
        <div className='aboutproject__meter aboutproject__meter_subtitle'>
          <span className='aboutproject__line aboutproject__line_first aboutproject__line_grey'>front-end</span>
          <span className='aboutproject__line aboutproject__line_second aboutproject__line_grey'>backend</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;