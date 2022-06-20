import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject.js'; 
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Header from '../Header/Header';

function Main({ autorized, handleOnClickBurger, isOpenBurger, onClose }) {

  return (
    <main className='main'>
      <Header
        autorized={autorized}
        themeDark={false}
        handleOnClickBurger={handleOnClickBurger}
        isOpenBurger={isOpenBurger}
        onClose={onClose}
      />
      <Promo />
      <AboutProject />
      <Techs/>
      <AboutMe/>
    </main>
  );
}

export default Main;