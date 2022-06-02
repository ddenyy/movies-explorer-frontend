import React from "react";
import { Link, Switch, Route } from 'react-router-dom';
import './Navigation.css'
import '../Header/Header.css';
function Navigation({ autorized, handleOnClickBurger, isOpenBurger, onClose }) {

  function handleBurgerOpen() {
    if (isOpenBurger) {
      return onClose()
    } else {
      return handleOnClickBurger()
    }
  }

  return (
    <>
      <div className={`navigation__cover navigation__cover_state_${isOpenBurger ? 'open' : 'close'}`}></div>
      {!autorized ? (
        <nav className='navigation'>
          <ul className='navigation__list'>
            <li className='navigation__item'>
              <Link className='navigation__link' to='/signup'>Регистрация</Link>
            </li>
            <li className='navigation__item'>
              <Link className='navigation__link navigation__link_type_signin' to='/signin'>Войти</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <nav className={`navigation navigation_type_autorized navigation_state_${isOpenBurger ? 'open' : 'close'}`}>
            <button className={`navigation__button ${isOpenBurger ? 'navigation__button_state_exit' : ''}`} type='button' onClick={handleBurgerOpen}></button>
            <ul className='navigation__list navigation__list_type_autorized'>
              <li className='navigation__item'>
                <Link className='navigation__link' to='/movies'>Фильмы</Link>
              </li>
              <li className='navigation__item'>
                <Link className='navigation__link' to='/save-movies'>Сохранённые фильмы</Link>
              </li>
            </ul>
            <Link to='/profile' className='navigation__link navigation__link_type_account'></Link>
          </nav>
        </>
      )}
    </>
  );
}

export default Navigation;