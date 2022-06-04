import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject.js'; 
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
function Main({ setIsThemeDark }) {

  React.useEffect(() => {
    setIsThemeDark(false)
  }, [])

  return (
    <main className='main'>
      <Promo />
      <AboutProject />
      <Techs/>
      <AboutMe/>
    </main>
  );
}

export default Main;