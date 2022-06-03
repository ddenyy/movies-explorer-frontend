import React from "react";
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <section className='movies'>
      <div className='movies__content'>
        <SearchForm />
        <div className='movies__line'></div>
        <MoviesCardList />
      </div>
    </section>
  );
}

export default Movies;