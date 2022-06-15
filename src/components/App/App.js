import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import api from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import * as MoviesAuth from '../../utils/MainApiAuth';
import { infoToolTipContext } from "../../context/infoToolTipContext";
import { currentUserContext } from "../../context/CurrentUserContext";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const [isShowHeader, setIsShowHeader] = useState(null);
  const [isAutorized, setIsAutorized] = useState(null);
  const [isBurgerOpen, setIsBurgernOpen] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isShortFilter, setIsShortFilter] = useState(false);
  const [ movieReq, setMovieReq ] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [beatfilmMovies, setbeatfilmMovies] = React.useState([]);
  const [sortedMovies, setSortedMovies] = React.useState([]);
  const [saveMovies, setSaveMovies] = React.useState([]);

  const [currentInfoToolTip, setCurrentInfoToolTip] = React.useState({
    isSucces: false,
    isOpen: false,
    text: '',
    isSuccesUpdateInfo: true,
  });


  const history = useHistory();
  
  React.useEffect(() => {
    // рендер страницы
    localStorage.removeItem('reqFilmValue');
    if (currentUser || isAutorized) {
      return api.getUserInfo()
        .then((res) => {
          console.log(res)
          setCurrentUser(res);
        })
        .catch((err) => console.log(err))
    }
  }, [isAutorized]);

  React.useEffect(() => {
    checkToken();
    Promise.all([MoviesApi.getMovies(), api.getAllSavedMovies(), api.getUserInfo()])
      .then(([moviesRes, saveMoviesRes, userInfo]) => {
        setbeatfilmMovies(moviesRes);
        const savedMoviesList = saveMoviesRes.movies.filter(
          (item) => item.owner === userInfo._id
        );
        setSaveMovies(savedMoviesList);
      })
      .catch((e) => console.log(e))
  }, []);


  function closeAll() {
    setIsBurgernOpen(false);
    setCurrentInfoToolTip({
      isSucces: false,
      isOpen: false,
      text: '',
      isSuccesUpdateInfo: true,
    });
  }

  function checkToken() {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      MoviesAuth.getCurrentUserInfo(jwt)
        .then((res) => {
          console.log(res)
          if (res.email) {
            setCurrentUser(res);
            setIsAutorized(true);
            setIsShowHeader(true);
            history.push("/");
          }
        })
        .catch(e => console.log(e))
    }
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
          setIsShowHeader(true);
          history.push("/");
        }
      })
      .catch(e => console.log(e))
    );
  }

  // возвращает информацию по поводу текущего пользоваля
  function getCurrentUserInfo() {
    return (
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((e) => console.log(e))
    );
  }

  // обновляем информацию о текущем пользователе
  function handleUpdateInfo(email, name) {
    setLoader(true);
    return api.updateUserInfo({ email, name })
      .then((res) => {
        setCurrentUser(res);
        setLoader(false);
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

  // управляет выходом пользователя из аккаунта
  function handleExit() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setIsAutorized(false);
    setIsShowHeader(false);
    history.push('/signin');
  }

  function handleSaveMovie(movie) {
    setLoader(true);
    api.saveMovies(movie)
      .then((res) => {
        if (res.movie) {
          const newSavedMovies = [res.movie, ...saveMovies];
          setSaveMovies(newSavedMovies)
        } else {
          throw new Error('При сохранении фильма произошла ошибка.')
        }
      })
      .catch(e => {setCurrentInfoToolTip({
        isSuccesUpdateInfo: false,
        isSucces: false,
        isOpen: true,
        text: `Ошибка ${e}`,
      })})
      .finally(() => setLoader(false))
  }

  function handleDeleteSaveMovie(movie) {
    setLoader(true);
    const thisId = movie.id || movie.movieId;
    const thisMovie = saveMovies.find((item) => item.movieId === thisId);
    api.deleteMovie(thisMovie._id)
      .then((deletedMovie) => {
        if (!deletedMovie) {
          throw new Error('При удалении фильма произошла ошибка.')
        } else {
          const newSaveMoviesList = saveMovies.filter((c) => c.movieId !== thisId);
          setSaveMovies(newSaveMoviesList);
        }
      })
      .catch((e) => console.log(`ошибка при удалении фильма: ${e}`))
      .finally(() => setLoader(false))
  }


  function checkSavedMovie(movie) {
    return (movie.isSaved = saveMovies.some(
      (saveMovie) => saveMovie.movieId === movie.id
    ));
  }

  function handleGetMovies(keyword) {
    setMovieReq(keyword);
    const key = new RegExp(keyword, "gi");
    const findedMovies = beatfilmMovies.filter((item) => {
      return key.test(item.nameRU) || key.test(item.nameEN)
    });
    if (findedMovies.length === 0) {
      setCurrentInfoToolTip({
        isSucces: false,
        isOpen: true,
        text: 'Ничего не найдено :(',
      })
    }
    const checkedSaveMovies = findedMovies.map((movie) => {
      movie.isSaved = saveMovies.some((saveMovie) => {
        return saveMovie.movieId === movie.id
      });
      return movie;
    });
    setSortedMovies(checkedSaveMovies);
  }

  function handleCheckBox() {
    setIsShortFilter(!isShortFilter);
  }

  function filterShortMovies(arr) {
    if (arr) { return arr.filter((movie) => isShortFilter ? movie.duration <= 40 : true) }
	}

  return (
    <currentUserContext.Provider value={currentUser}>
      <infoToolTipContext.Provider value={currentInfoToolTip}>
        <div className='page'>
          <Preloader isOpen={isLoader} />
          {isShowHeader ?
            <Header
              autorized={isAutorized}
              themeDark={isThemeDark}
              handleOnClickBurger={handleBurgerionOpen}
              isOpenBurger={isBurgerOpen}
              onClose={closeAll}
            />
            :
            <></>
          }
          <Switch>
            <Route path='/signin'>
              <Login
                handleLogin={handleLogin}
                setIsThemeDark={setIsThemeDark}
              />
            </Route>
            <Route path='/signup'>
              <Register
                handleRegister={handleRegister}
              />
            </Route>
            <ProtectRoute
              path='/'
              exact
              autorized={isAutorized}
              component={Main}
              setIsThemeDark={setIsThemeDark}
            />
            <ProtectRoute
              path='/movies'
              component={Movies}
              movies={filterShortMovies(sortedMovies)}
              autorized={isAutorized}
              setIsThemeDark={setIsThemeDark}
              setIsShowHeader={setIsShowHeader}
              handleSaveMovie={handleSaveMovie}
              handleDeleteSaveMovie={handleDeleteSaveMovie}
              handleGetMovies={handleGetMovies}
              checkSavedMovie={checkSavedMovie}
              handleCheckBox={handleCheckBox}
              isShortFilter={isShortFilter}
              movieReq={movieReq}
              setMovieReq={setMovieReq}
            />
            <ProtectRoute
              path='/save-movies'
              component={SavedMovies}
              autorized={isAutorized}
              setIsThemeDark={setIsThemeDark}
              setIsShowHeader={setIsShowHeader}
              saveMovies={saveMovies}
              isSavedMovies={true}
              handleDeleteSaveMovie={handleDeleteSaveMovie}
            />
            <ProtectRoute
              path='/profile'
              component={Profile}
              autorized={isAutorized}
              currentUser={currentUser}
              setIsThemeDark={setIsThemeDark}
              handleUpdateInfo={handleUpdateInfo}
              handleExit={handleExit}
              setIsShowHeader={setIsShowHeader}
            />
            <Route>
              {isAutorized ?
                <Redirect exact to="/" />
                :
                <Redirect to="/signin" />}
            </Route>
            <Route path='/'>
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
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
