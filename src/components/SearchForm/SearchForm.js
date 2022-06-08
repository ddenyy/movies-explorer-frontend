import React from "react";
import './SearchForm.css';

function SearchForm () {

    return (
        <form className='search-form search-form_position_movies'>
            <input required className='search-form__input' type='text' placeholder="фильм"></input>
            <button className="search-form__button search-form__button_type_send"></button>
            <div className='menu-toggle__container'>
                <p className='menu-toggle__text'>Короткометражки</p>
                <input type="checkbox" id="toggle-button" className="search-form__button search-form__button_type_toggle"></input>
            </div>
        </form>
    );
}

export default SearchForm;