import React from "react";
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({setIsThemeDark}) {

  React.useEffect(() => {
    setIsThemeDark(true)
  }, [])

  return (
    <section className='movies'>
      <div className='movies__content'>
        <SearchForm />
        <img className='movies__line'/>
        <MoviesCardList />
        <button className='movies__button movies__button_type_add'>Ещё</button>
      </div>
    </section>
  );
}

export default Movies;