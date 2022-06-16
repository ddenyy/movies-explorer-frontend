import React from "react";
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ setIsThemeDark, setIsShowHeader, movies, handleSaveMovie, handleDeleteSaveMovie, handleGetMovies, checkSavedMovie, handleCheckBox, isShortFilter, isSavedMovies }) {

  React.useEffect(() => {
    setIsThemeDark(true);
    setIsShowHeader(true);
  }, [])

  React.useEffect(() => {
    handleHiddenButton();
    setcountAdder(3);
    setcountMovies(12);
    handleShowMovies();
  }, [movies])

  const [countMovies, setcountMovies] = React.useState(12);
  const [countAdder, setcountAdder ] = React.useState(3);
  const [isHuddenButton, setIsHuddenButton] = React.useState(true);

  window.addEventListener('resize', () => {
    handleShowMovies();
  })

  function handleShowMovies () {
    setTimeout(() => {
      if (window.innerWidth <= 1280 & window.innerWidth > 769) {
        setcountMovies(12)
        setcountAdder(3)
      } else if (window.innerWidth < 769 & window.innerWidth > 481) {
        setcountMovies(8)
        setcountAdder(2)
      } else if (window.innerWidth < 481 & window.innerWidth > 0){
        setcountMovies(5)
        setcountAdder(1)
      } else {
        setcountMovies(12)
        setcountAdder(3)
      }
    }, 1000)
  }

  function showMore() {
    if ( movies.length  < countMovies) {
      setIsHuddenButton(true);
    } else {
      setcountMovies(countMovies + countAdder);
      setIsHuddenButton(false);
    }
  }

  function handleHiddenButton () {
    if (movies[countMovies]) {
      setIsHuddenButton(false);
    } else {
      setIsHuddenButton(true)
    }
  }

  return (
    <section className='movies'>
      <div className='movies__content'>
        <SearchForm handleGetMovies={handleGetMovies} handleCheckBox={handleCheckBox} isShortFilter={isShortFilter} isSavedMovies={isSavedMovies}/>
        <img className='movies__line' />
        <MoviesCardList countMovies={countMovies} isSavedMovies={false} movies={movies} handleSaveMovie={handleSaveMovie} handleDeleteSaveMovie={handleDeleteSaveMovie} checkSavedMovie={checkSavedMovie} />
        {!isHuddenButton ?
          <button onClick={showMore} className='movies__button movies__button_type_add'>Ещё</button>
          :
          <></>
        }
      </div>
    </section>
  );
}

export default Movies;