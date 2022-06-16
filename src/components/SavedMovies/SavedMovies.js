import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css'
function SavedMovies({ setIsThemeDark, setIsShowHeader, saveMovies, handleDeleteSaveMovie, isSavedMovies, handleCheckBox, isShortFilter, handleGetSavedMovies }) {
  React.useEffect(() => {
    setIsThemeDark(true);
    setIsShowHeader(true);
  }, [])
  return (
    <section className='movies'>
      <div className='movies__content'>
        <SearchForm isSavedMovies={isSavedMovies} handleCheckBox={handleCheckBox} isShortFilter={isShortFilter} handleGetSavedMovies={handleGetSavedMovies} />
        <img className='movies__line' />
        <MoviesCardList movies={saveMovies} isSavedMovies={isSavedMovies} handleDeleteSaveMovie={handleDeleteSaveMovie}/>
      </div>
    </section>
  );
}

export default SavedMovies;
