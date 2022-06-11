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
import Preloader from '../Preloader/Preloader';
import getMovies from '../../utils/MoviesApi';
import * as MoviesAuth from '../../utils/MainApiAuth';
import { infoToolTipContext } from "../../context/infoToolTipContext";
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { currentUserContext } from "../../context/CurrentUserContext";
import api from '../../utils/MainApi';


function App() {

  const [isAutorized, setIsAutorized] = useState(null);
  const [isBurgerOpen, setIsBurgernOpen] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentInfoToolTip, setCurrentInfoToolTip] = React.useState({
    isSucces: false,
    isOpen: false,
    text: '',
    isSuccesUpdateInfo: true,
  });

  const history = useHistory();

  React.useEffect(() => {
    // рендер страницы
    if (currentUser || isAutorized) {
      return api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err))
    }
  }, [isAutorized]);

  function closeAll() {
    setIsBurgernOpen(false);
    setCurrentInfoToolTip({
      isSucces: false,
      isOpen: false,
      text: '',
      isSuccesUpdateInfo: true,
    });
  }

  function handleBurgerionOpen() {
    setIsBurgernOpen(true);
  }

  function handleRegister(email, password, name) {
    setLoader(true);
    return (
      MoviesAuth.register(email, password, name)
        .then((res) => {
          if (res.email) {
            console.log('успешно')
            setLoader(false);
            setCurrentInfoToolTip({
              isSucces: true,
              isOpen: true,
              text: 'Вы успешно зарегистрировались!',
            })
            history.push("/signin")
          }
          else {
            setCurrentInfoToolTip({
              isSucces: false,
              isOpen: true,
              text: res.message,
            })
            throw new Error(res.message)
          }
        })
        .catch((e) => {
          console.log(e)
          setLoader(false);
        })
    );
  }

  // управляет возможность закрывать попапы по esc
  function useEscapePress(callback, dependency) {
    React.useEffect(() => {
      if (dependency) {
        const onEscClose = e => {
          if (e.key === 'Escape') {
            callback()
          }
        }
        document.addEventListener('keyup', onEscClose);
        // при размонтировании удалим обработчик данным колбэком
        return () => {
          document.removeEventListener('keyup', onEscClose)
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency])
  }

  function handleLogin(email, password) {
    setLoader(true);
    return (MoviesAuth.authorize(email, password)
      .then((res) => {
        if (!res) {
          setCurrentInfoToolTip({
            isSucces: false,
            isOpen: true,
            text: 'Вы ввели неправильную почту или пароль'
          })
          setLoader(false);
        }
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          getCurrentUserInfo();
          setIsAutorized(true);
          setLoader(false);
          history.push("/");
        }
      })
      .catch(e => console.log(e))
    );
  }

  function getCurrentUserInfo() {
    return (
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((e) => console.log(e))
    );
  }

  function handleUpdateInfo(email, name) {
    setLoader(true);
    return api.updateUserInfo({ email, name })
      .then((res) => {
        setCurrentUser(res);
        setLoader(true);
        setCurrentInfoToolTip({
          isSuccesUpdateInfo: true,
          isSucces: true,
          isOpen: true,
          text: 'всё отлично',
        })
      })
      .catch((e) => {
        console.log(e)
        setLoader(false);
        setCurrentInfoToolTip({
          isSuccesUpdateInfo: false,
          isSucces: false,
          isOpen: false,
          text: `${e == 409 ? 'пользователь с таким email уже есть' : 'При обновлении профиля произошла ошибка.'}`,
        })
      })
      .finally(() => {
        setLoader(false);
      })
  }

  function handleExit() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setIsAutorized(false);
    history.push('/signin');
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <infoToolTipContext.Provider value={currentInfoToolTip}>
        <div className='page'>
          <Preloader isOpen={isLoader} />
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
              <Profile currentUser={currentUser} setIsThemeDark={setIsThemeDark} handleUpdateInfo={handleUpdateInfo} handleExit={handleExit} />
            </Route>
            <Route path='/signin'>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path='/signup'>
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path='/' exact>
              <Header autorized={isAutorized} themeDark={isThemeDark} handleOnClickBurger={handleBurgerionOpen} isOpenBurger={isBurgerOpen} onClose={closeAll} />
              <Main setIsThemeDark={setIsThemeDark} />
              <Footer />
            </Route>
            <Route path='/'>
              <PageNotFound />
            </Route>
          </Switch>
          <InfoTooltip
            onClose={closeAll}
            useEscapePress={useEscapePress}
          />
        </div>
      </infoToolTipContext.Provider>
    </currentUserContext.Provider>
  );
}

export default App;
