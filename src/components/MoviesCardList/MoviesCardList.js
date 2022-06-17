import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, handleSaveMovie, handleDeleteSaveMovie, isSavedMovies, checkSavedMovie, countMovies }) {

  // React.useEffect(() => {
  //   if (isSavedMovies) {

  //   } else {
  //     movies = JSON.parse(localStorage.getItem('sortedMovies'));
  //     console.log(movies)
  //   }
  // }, [movies])

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