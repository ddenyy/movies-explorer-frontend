import './Header.css'
import { Link, Switch, Route } from 'react-router-dom';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';

function Header({ themeDark, autorized, handleOnClickBurger, isOpenBurger, onClose }) {
  return (
    <header className={`header header_theme_${themeDark ? 'dark' : 'bright'}`}>
      <div className='header__container'>
      <Link to='/'>
        <img src={logo} alt='логотип'/>
      </Link>
        <Navigation autorized={autorized} handleOnClickBurger={handleOnClickBurger} isOpenBurger={isOpenBurger} onClose={onClose}/>
      </div>
    </header>
  );
}

export default Header;
