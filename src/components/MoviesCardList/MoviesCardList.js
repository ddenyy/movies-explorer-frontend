import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <article className='movies-card-list'>
      <div className='movies-card-list__content'>
        <MoviesCard id={1}/>
        <MoviesCard id={2}/>
        <MoviesCard id={3}/>
        <MoviesCard id={4}/>
        <MoviesCard id={5}/>
        <MoviesCard id={6}/>
        <MoviesCard id={7}/>
        <MoviesCard id={8}/>
        <MoviesCard id={9}/>
      </div>
    </article>
  );
}

export default MoviesCardList;