import React from "react";
import './MoviesCard.css';

function MoviesCard({ id, isSavedMovies }) {

  return (
    <div className='card'>
      <div className='card__info'>
        <h3 className='card__title'>Имя карточки {id}</h3>
        <p className='card__viewing-time'>1ч 47мин</p>
          <input type="checkbox" className={`card__button_type_save ${isSavedMovies ? 'card__button_type_delete' : ''}`} id={id} name="save-movie-button" value="yes"></input>
          <label htmlFor={id}></label>
      </div>
      <div className='card__image'></div>
    </div>
  );
}

export default MoviesCard;