import React, { useState } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Footer from '../Footer/Footer';

function App() {

  

  const [isBurgerOpen, setIsBurgernOpen] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);

  function closeAll() {
    setIsBurgernOpen(false);
  }

  function handleBurgerionOpen() {
    setIsBurgernOpen(true);
  }

  return (
    <div className='page'>
      <Header themeDark={isThemeDark} handleOnClickBurger={handleBurgerionOpen} isOpenBurger={isBurgerOpen} onClose={closeAll} />
      <Switch>
        <Route path='/movies'>
          <Movies setIsThemeDark={setIsThemeDark} />
        </Route>
        <Route path='/save-movies'>
          <SavedMovies setIsThemeDark={setIsThemeDark} />
        </Route>
        {/* <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route> */}
        <Route path='/' exact>
          <Main setIsThemeDark={setIsThemeDark}/>
        </Route>
      </Switch>
    <Footer/>
    </div>
  );
}

export default App;
