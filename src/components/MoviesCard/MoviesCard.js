import React from "react";
import './MoviesCard.css';

function MoviesCard({ isSavedMovies, movie, handleSaveMovie, handleDeleteSaveMovie, checkSavedMovie }) {

  let isLiked = !isSavedMovies && checkSavedMovie(movie)


  const { nameRU, image, trailerLink, duration } = movie;
  

  function handleMovie () {
    if (movie.isSaved) {
      handleDelete();
    } else {
      handleSave();
    }
  }

  // отвечает за сохранение фильма
  function handleSave() {
      handleSaveMovie(movie);
  }
  // отвечает за удаление филмьа
  function handleDelete () {
    handleDeleteSaveMovie(movie);
  }

  return (
    <div className='card'>
      <div className='card__info'>
        <h3 className='card__title'>{nameRU}</h3>
        <p className='card__viewing-time'>{`${Math.round(duration / 60)}ч ${duration % 60}мин`}</p>
        {isSavedMovies ?
          <button onClick={handleDelete} type='button' className='switch-btn_position_movie switch-btn_position_save-movie'></button>
          :
          <button onClick={handleMovie} type='button' className={`switch-btn_position_movie ${isLiked ? 'switch-on_position_movie' : ''}`}></button>
        }
      </div>
      <img src={`${isSavedMovies ? image : `https://api.nomoreparties.co/${image.url}`}`} className='card__image' />
    </div>
  );
}

export default MoviesCard;