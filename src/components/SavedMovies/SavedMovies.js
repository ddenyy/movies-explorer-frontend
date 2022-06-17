import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import './SavedMovies.css'
function SavedMovies({ autorized, handleOnClickBurger, isOpenBurger, onClose, saveMovies, handleDeleteSaveMovie, isSavedMovies, handleCheckBox, handleGetSavedMovies, isShortFilter }) {
  
  return (
    <>
      <Header
        autorized={autorized}
        themeDark={true}
        handleOnClickBurger={handleOnClickBurger}
        isOpenBurger={isOpenBurger}
        onClose={onClose}
      />
      <section className='movies'>
        <div className='movies__content'>
          <SearchForm isSavedMovies={isSavedMovies} handleCheckBox={handleCheckBox} handleGetSavedMovies={handleGetSavedMovies} isShortFilter={isShortFilter} />
          <img className='movies__line' />
          <MoviesCardList movies={saveMovies} isSavedMovies={isSavedMovies} handleDeleteSaveMovie={handleDeleteSaveMovie} />
        </div>
      </section>
    </>
  );
}

export default SavedMovies;
