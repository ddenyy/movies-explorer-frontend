import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css'
function SavedMovies({ setIsThemeDark }) {
  React.useEffect(() => {
    setIsThemeDark(true)
  }, [])
  return (
    <section className='movies'>
      <div className='movies__content'>
        <SearchForm />
        <img className='movies__line' />
        <MoviesCardList isSavedMovies={true} />
      </div>
    </section>
  );
}

export default SavedMovies;