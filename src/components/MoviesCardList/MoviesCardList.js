import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, handleSaveMovie, handleDeleteSaveMovie, isSavedMovies, checkSavedMovie, countMovies }) {

  return (
    <article className='movies-card-list'>
      <div className='movies-card-list__content'>
        {movies.slice(0, countMovies).map((movie) => {
          return (
            <MoviesCard
              key={movie.movieId || movie.id}
              movie={movie}
              handleSaveMovie={handleSaveMovie}
              handleDeleteSaveMovie={handleDeleteSaveMovie}
              isSavedMovies={isSavedMovies}
              checkSavedMovie={checkSavedMovie}
            />
          );
        })}
      </div>
    </article>
  );
}

export default MoviesCardList;