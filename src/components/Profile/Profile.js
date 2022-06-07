import React from "react";
import './Profile.css';

function Profile({ setIsThemeDark }) {
  React.useEffect(() => {
    setIsThemeDark(true);
  })
  return (
    <section className='profile'>
      <div className='profile__content'>
        <h2 className='profile__name'>Привет, Денис!</h2>
        <form className='form profile__form'>
          <label className="profile__label">
            <input className='profile__input profile__input_order_first' value='Денис'></input>
            <span className='profile__signature'>Имя</span>
          </label>
          <div className='profile__line'></div>
          <label className="profile__label">
            <input className='profile__input profile__input_order_second' value='test@test.ru'></input>
            <span className='profile__signature'>Email</span>
          </label>
        </form>
        <div className='button__container'>
          <button className='profile__button profile__button_type_edit'>Редактировать</button>
          <button className='profile__button profile__button_type_exit'>Выйти из аккаунта</button>
        </div>
      </div>
    </section>
  );;
}

export default Profile