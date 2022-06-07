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
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {

  const [isAutorized, setIsAutorized] = useState(true);
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
      <Switch>
        <Route path='/movies'>
          <Header autorized={isAutorized} themeDark={isThemeDark} handleOnClickBurger={handleBurgerionOpen} isOpenBurger={isBurgerOpen} onClose={closeAll} />
          <Movies setIsThemeDark={setIsThemeDark} />
          <Footer />
        </Route>
        <Route path='/save-movies'>
          <Header autorized={isAutorized} themeDark={isThemeDark} handleOnClickBurger={handleBurgerionOpen} isOpenBurger={isBurgerOpen} onClose={closeAll} />
          <SavedMovies setIsThemeDark={setIsThemeDark} />
          <Footer />
        </Route>
        <Route path='/profile'>
          <Header autorized={isAutorized} themeDark={isThemeDark} handleOnClickBurger={handleBurgerionOpen} isOpenBurger={isBurgerOpen} onClose={closeAll} />
          <Profile setIsThemeDark={setIsThemeDark} />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/' exact>
          <Header autorized={isAutorized} themeDark={isThemeDark} handleOnClickBurger={handleBurgerionOpen} isOpenBurger={isBurgerOpen} onClose={closeAll} />
          <Main setIsThemeDark={setIsThemeDark} />
          <Footer />
        </Route>
        <Route path='/'>
          <PageNotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
