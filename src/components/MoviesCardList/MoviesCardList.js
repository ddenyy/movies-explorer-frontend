import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSavedMovies }) {
  return (
    <article className='movies-card-list'>
      <div className='movies-card-list__content'>
        <MoviesCard isSavedMovies={isSavedMovies} id={1}/>
        <MoviesCard isSavedMovies={isSavedMovies} id={2}/>
        <MoviesCard isSavedMovies={isSavedMovies} id={3}/>
        <MoviesCard isSavedMovies={isSavedMovies} id={4}/>
        <MoviesCard isSavedMovies={isSavedMovies} id={5}/>
        <MoviesCard isSavedMovies={isSavedMovies} id={6}/>
        <MoviesCard isSavedMovies={isSavedMovies} id={7}/>
        <MoviesCard isSavedMovies={isSavedMovies} id={8}/>
        <MoviesCard isSavedMovies={isSavedMovies} id={9}/>
      </div>
    </article>
  );
}

export default MoviesCardList;