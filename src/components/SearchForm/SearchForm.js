import React, { useRef, useState } from "react";
import './SearchForm.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({ handleGetMovies, handleCheckBox, isSavedMovies, handleGetSavedMovies, isShortFilter }) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const refInputFilm = useRef();


  React.useEffect(() => {
    if (!isSavedMovies) {
      refInputFilm.current.value = localStorage.getItem('reqFilmValue');
    } else {
      refInputFilm.current.value = localStorage.getItem('reqSaveFilmValue');
    }
  }, [])

  // перерисовка формы
  React.useEffect(() => {
    resetForm();
  }, [resetForm])

  function toggleButton() {
    if (isShortFilter) {
      handleCheckBox(isSavedMovies);
    } else {
      handleCheckBox(isSavedMovies);
    }
  }


  function handleSubmit(e) {
    e.preventDefault();
    if (isSavedMovies) {
      handleGetSavedMovies(values.film);
      localStorage.setItem('reqSaveFilmValue', values.film);
    } else {
      handleGetMovies(values.film);
      localStorage.setItem('reqFilmValue', values.film);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='search-form search-form_position_movies'>
      <input required ref={refInputFilm} onChange={handleChange} value={values.film} className='search-form__input' type='text' name='film' placeholder="фильм"></input>
      <span className='search-form__error'>
        {errors.film || ''}
      </span>
      <button disabled={!isValid} type='submit' className="search-form__button search-form__button_type_send"></button>
      <div className='menu-toggle__container'>
        <p className='menu-toggle__text'>Короткометражки</p>
        <button type='button' onClick={toggleButton} className={`switch-btn ${isShortFilter ? 'switch-on' : ''}`}></button>
      </div>
    </form>
  );
}

export default SearchForm;