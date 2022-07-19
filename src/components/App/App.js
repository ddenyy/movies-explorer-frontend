import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import api from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import * as MoviesAuth from '../../utils/MainApiAuth';
import * as Validation from '../../utils/validation';
import { infoToolTipContext } from "../../context/infoToolTipContext";
import { currentUserContext } from "../../context/CurrentUserContext";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectRoute from '../ProtectedRoute/ProtectedRoute';
import AuthRoute from '../AuthRoute/AuthRoute';
import { MAX_DURATION_SHORT_FILMS } from '../../config/config';

function App() {
  const [isAutorized, setIsAutorized] = useState(true);
  const [isBurgerOpen, setIsBurgernOpen] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isShortFilter, setIsShortFilter] = useState(false);
  const [isShortFilterForSaveMovies, setIsShortFilterForSaveMovies] = useState(false)
  const [currentUser, setCurrentUser] = React.useState({});
  const [beatfilmMovies, setbeatfilmMovies] = React.useState([]);
  const [sortedMovies, setSortedMovies] = React.useState([]);
  const [saveMovies, setSaveMovies] = React.useState([]);
  const [sortedSaveMovies, setSortedSaveMovies] = React.useState([]);
  const [currentInfoToolTip, setCurrentInfoToolTip] = React.useState({
    isSucces: false,
    isOpen: false,
    text: '',
    isSuccesUpdateInfo: true,
  });

  const history = useHistory();

  // при перезагружке отобразим все фильмы из хранилища
  React.useEffect(() => {
    checkToken();
    if (localStorage.getItem('sortedMovies')) {
      setSortedMovies(JSON.parse(localStorage.getItem('sortedMovies')));
      setIsShortFilterForSaveMovies(JSON.parse(localStorage.getItem('isShortFilterForSaveMovies')));
      setIsShortFilter(JSON.parse(localStorage.getItem('isShortFilter')));
    }
  }, [])

  React.useEffect(() => {
    // checkToken();
    // проверям авторизован ли пользователь и запрашиваем информацию с сервера
    if (isAutorized) {
      Promise.all([MoviesApi.getMovies(), api.getAllSavedMovies()])
        .then(([moviesRes, saveMoviesRes]) => {
          localStorage.setItem('currentUser', JSON.stringify(userInfo));
          setbeatfilmMovies(moviesRes);
          // localStorage.setItem("movies", JSON.stringify(moviesRes));
          const savedMoviesList = saveMoviesRes.movies.filter(
            (item) => item.owner === currentUser._id
          );
          if (localStorage.getItem('sortedSaveMovies')) {
            setSortedSaveMovies(JSON.parse(localStorage.getItem('sortedSaveMovies')));
          } else {
            setSortedSaveMovies(savedMoviesList);
          }
          setSaveMovies(savedMoviesList);
        })
        .catch((e) => console.log(e))
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

  function checkToken() {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      MoviesAuth.getCurrentUserInfo(jwt)
        .then((res) => {
          if (res.email) {
            setCurrentUser(res);
            setIsAutorized(true);
          }
        })
        .catch(e => {
          console.log(`С токеном что-то не так: ${e}`);
          setIsAutorized(false);
          localStorage.removeItem('jwt');
          history.push('/')
        })
    } else {
      setIsAutorized(false);
      history.push('/');
    }
  }

  // открываем и закрываем бургерное меню
  function handleBurgerionOpen() {
    setIsBurgernOpen(true);
  }

  function handleRegister(email, password, name) {
    if (Validation.isEmail(email) && (password.length <= 8) && (name.length > 1)) {
      setLoader(true);
      return (
        MoviesAuth.register(email, password, name)
          .then(async (res) => {
            if (res.email) {
              // если пользователь зарегистрировался сразу его авторизуем
              await handleLogin(res.email, password);
              setLoader(false);
              setCurrentInfoToolTip({
                isSucces: true,
                isOpen: true,
                text: 'Вы успешно зарегистрировались!',
              })
              history.push("/movies");
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
            console.log(e);
            history.push('/')
            setLoader(false);
          })
      );
    } else {
      setCurrentInfoToolTip({
        isSucces: false,
        isOpen: true,
        text: 'Проверьте корректность введённых данных'
      });
    }

  }

  function handleLogin(email, password) {
    if (Validation.isEmail(email) && (password.length <= 8)) {
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
            history.push('/movies');
          }
        })
        .catch(e => console.log(e))
      );
    } else {
      setCurrentInfoToolTip({
        isSucces: false,
        isOpen: true,
        text: 'Проверьте корректность введённых данных'
      });
    }
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
    if (Validation.isEmail(email) && name.length > 1) {
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
    } else {
      setLoader(false);
      setCurrentInfoToolTip({
        isSuccesUpdateInfo: false,
        isSucces: false,
        isOpen: true,
        text: 'проверьте корректность изменённых данных.',
      })
    }
  }

  // управляет выходом пользователя из аккаунта
  function handleExit() {
    localStorage.clear();
    setCurrentUser({});   
    setIsAutorized(false);
    setSaveMovies([]);
    setSortedMovies([]);
    setSortedSaveMovies([]);
    history.push('/');
  }

  // ф-ция сохранения фильма
  function handleSaveMovie(movie) {
    setLoader(true);
    api.saveMovies(movie)
      .then((res) => {
        if (res.movie) {
          const newSavedMovies = [res.movie, ...saveMovies];
          localStorage.setItem('saveMovies', JSON.stringify(newSavedMovies));
          setSaveMovies(newSavedMovies);
          setSortedSaveMovies(newSavedMovies);
          localStorage.setItem('sortedSaveMovies', JSON.stringify(newSavedMovies));
        } else {
          throw new Error('При сохранении фильма произошла ошибка.')
        }
      })
      .catch(e => {
        setCurrentInfoToolTip({
          isSuccesUpdateInfo: false,
          isSucces: false,
          isOpen: true,
          text: `Ошибка ${e}`,
        })
      })
      .finally(() => setLoader(false))
  }

  // ф-ция удаления сохранённого фильма
  function handleDeleteSaveMovie(movie) {
    setLoader(true);
    // находим фильм который хотим удалить в savedMovies и вытаскиваем из него _id чтоб удалить из нашей БД на беке
    const thisId = movie.id || movie.movieId;
    const thisMovie = saveMovies.find((item) => item.movieId === thisId);

    api.deleteMovie(thisMovie._id)
      .then((deletedMovie) => {
        if (!deletedMovie) {
          throw new Error('При удалении фильма произошла ошибка.')
        } else {
          const newSaveMoviesList = saveMovies.filter((c) => c.movieId !== thisId);
          // обновляем список сохранённых фильмов. SaveMovies чтоб если что смогли удалить эту карточку,
          // а отсортированный чтоб пользователю грамотно отображалось
          setSaveMovies(newSaveMoviesList);
          setSortedSaveMovies(newSaveMoviesList);
          localStorage.setItem('sortedSaveMovies', JSON.stringify(newSaveMoviesList));
          localStorage.setItem('saveMovies', JSON.stringify(newSaveMoviesList));
        }
      })
      .catch((e) => console.log(`ошибка при удалении фильма: ${e}`))
      .finally(() => setLoader(false))
  }

  // проверяем сохранён ли фильм был чтоб отобразить верное состояние лайка
  function checkSavedMovie(movie) {
    return (movie.isSaved = saveMovies.some(
      (saveMovie) => saveMovie.movieId === movie.id
    ));
  }

  // ф-ция поиска и получения фильмов
  function handleGetMovies(keyword) {
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
      movie.isSaved = checkSavedMovie(movie);
      return movie;
    });
    setSortedMovies(checkedSaveMovies);
    localStorage.setItem('sortedMovies', JSON.stringify(checkedSaveMovies))
  }

  function handleGetSavedMovies(keyword) {
    const key = new RegExp(keyword, "gi");
    const findedMovies = saveMovies.filter((item) => {
      return key.test(item.nameRU) || key.test(item.nameEN)
    });
    if (findedMovies.length === 0) {
      setCurrentInfoToolTip({
        isSucces: false,
        isOpen: true,
        text: 'Ничего не найдено :(',
      })
    }
    setSortedSaveMovies(findedMovies);
    localStorage.setItem('sortedSaveMovies', JSON.stringify(findedMovies))
  }

  // управляет фильтром на короткометражки его состоянием вкл или выкл
  function handleCheckBox(isSaveMoviePosition) {
    if (isSaveMoviePosition) {
      setIsShortFilterForSaveMovies(!isShortFilterForSaveMovies)
      localStorage.setItem('isShortFilterForSaveMovies', JSON.stringify(!isShortFilterForSaveMovies))
    } else {
      setIsShortFilter(!isShortFilter);
      localStorage.setItem('isShortFilter', JSON.stringify(!isShortFilter))
    }
  }
  // управляет логикой фильтра короткометражек
  function filterShortMovies(arr, isSaveMoviePosition) {
    if (arr) {
      if (isSaveMoviePosition) {
        return arr.filter((movie) => isShortFilterForSaveMovies ? movie.duration <= MAX_DURATION_SHORT_FILMS : true)
      } else {
        return arr.filter((movie) => isShortFilter ? movie.duration <= MAX_DURATION_SHORT_FILMS : true)
      }
    }
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <infoToolTipContext.Provider value={currentInfoToolTip}>
        <div className='page'>
          <Preloader isOpen={isLoader} />
          <Switch>
            <ProtectRoute
              autorized={isAutorized}
              path='/movies'
              component={Movies}
              movies={filterShortMovies(sortedMovies, false)}
              handleSaveMovie={handleSaveMovie}
              handleDeleteSaveMovie={handleDeleteSaveMovie}
              handleGetMovies={handleGetMovies}
              checkSavedMovie={checkSavedMovie}
              handleCheckBox={handleCheckBox}
              isSavedMovies={false}
              isShortFilter={isShortFilter}
              handleOnClickBurger={handleBurgerionOpen}
              isOpenBurger={isBurgerOpen}
              onClose={closeAll}
            />
            <ProtectRoute
              path='/save-movies'
              component={SavedMovies}
              autorized={isAutorized}
              saveMovies={filterShortMovies(sortedSaveMovies, true)}
              isSavedMovies={true}
              handleDeleteSaveMovie={handleDeleteSaveMovie}
              handleCheckBox={handleCheckBox}
              handleGetSavedMovies={handleGetSavedMovies}
              isShortFilter={isShortFilterForSaveMovies}
              handleOnClickBurger={handleBurgerionOpen}
              isOpenBurger={isBurgerOpen}
              onClose={closeAll}
            />
            <ProtectRoute
              path='/profile'
              component={Profile}
              autorized={isAutorized}
              handleUpdateInfo={handleUpdateInfo}
              handleExit={handleExit}
              handleOnClickBurger={handleBurgerionOpen}
              isOpenBurger={isBurgerOpen}
              onClose={closeAll}
            />
            <Route path='/' exact>
              <Main
                autorized={isAutorized}
                handleOnClickBurger={handleBurgerionOpen}
                isOpenBurger={isBurgerOpen}
                onClose={closeAll}
              />
            </Route>
            <AuthRoute
              path='/signin'
              component={Login}
              handleLogin={handleLogin}
              autorized={isAutorized}
            />
            <AuthRoute
              path='/signup'
              component={Register}
              handleRegister={handleRegister}
              autorized={isAutorized}
            />
            <Route path='/'>
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            onClose={closeAll}
          />
        </div>
      </infoToolTipContext.Provider>
    </currentUserContext.Provider>
  );
}

export default App;
