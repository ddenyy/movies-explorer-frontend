import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <div className='techs__content'>
        <h2 className='about-project__title about-project__title_position_techs'>Технологии</h2>
        <div className='about-project__border about-project__border_position_techs'></div>
        <h2 className='techs__title_main'>7 технологий</h2>
        <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__list'>
          <li className='techs__element'>HTML</li>
          <li className='techs__element'>CSS</li>
          <li className='techs__element'>JS</li>
          <li className='techs__element'>React</li>
          <li className='techs__element'>Git</li>
          <li className='techs__element'>Express.js</li>
          <li className='techs__element'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;