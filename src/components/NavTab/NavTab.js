import React, { useState } from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom'
function NavTab ({ isOpen, onClose }) {

  return (
    <>
      <div className={`cover ${isOpen === true ? `cover_open` : ``}`}></div>
      <div className={`navtab ${isOpen === true ? `navtab_open` : ``}`}>
        <nav className='navtab__content'>
          <button className='button_exit button_nav' onClick={onClose}></button>
          <ul className='navtab__list'>
            <li className='navtab__element'>
              <Link className={`navtab__link ${window.location.pathname === '/' ? 'navtab__link_active' : ''}`} to='/' onClick={onClose}>Главная</Link>
            </li>
            <li className='navtab__element'>
              <Link className={`navtab__link ${window.location.pathname === '/movies' ? 'navtab__link_active' : ''}`} to='/movies' onClick={onClose}>Фильмы</Link>
            </li>
            <li className='navtab__element'>
              <Link className={`navtab__link ${window.location.pathname === '/save-movies' ? 'navtab__link_active' : ''}`} to='/save-movies' onClick={onClose}>Сохранённые фильмы</Link>
            </li>
            <li>
              
            </li>
          </ul>
        </nav>
        <Link className='navtab__link_account' to='/profile'></Link>
      </div>
    </>
  );
}

export default NavTab ;

