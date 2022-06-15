import React, {useRef} from "react";
import './SearchForm.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({ handleGetMovies, handleCheckBox, isShortFilter }) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const refInputFilm= useRef();

  React.useEffect(() => {
    refInputFilm.current.value = localStorage.getItem('reqFilmValue');
  })

  function toggleButton() {
    if (isShortFilter) {
      handleCheckBox();
    } else {
      handleCheckBox();
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleGetMovies(values.film);
    localStorage.setItem('reqFilmValue', values.film);
    localStorage.removeItem('searchValue')
  }

  return (
    <form onSubmit={handleSubmit} className='search-form search-form_position_movies'>
      <input ref={refInputFilm} onChange={handleChange} value={values.film} required className='search-form__input' type='text' name='film' placeholder="фильм"></input>
      <button type='submit' className="search-form__button search-form__button_type_send"></button>
      <div className='menu-toggle__container'>
        <p className='menu-toggle__text'>Короткометражки</p>
        <button type='button' onClick={toggleButton} className={`switch-btn ${isShortFilter ? 'switch-on' : ''}`}></button>
      </div>
    </form>
  );
}

export default SearchForm;