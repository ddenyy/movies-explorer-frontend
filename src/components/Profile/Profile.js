import React, { useState, useRef } from "react";
import './Profile.css';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import '../Register/Register.css'
import { infoToolTipContext } from '../../context/infoToolTipContext.js';

function Profile({ currentUser, setIsThemeDark, handleUpdateInfo, handleExit }) {
  const [isEditInfo, setIsEditInfo] = React.useState(false);
  const refInputName = useRef();
  const refInputEmail = useRef();
  const contextEditProfile = React.useContext(infoToolTipContext);
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  // через ref обращаемся напрямую к инпутам и ставим им значение текущего пользователя
  React.useEffect(() => {
    refInputName.current.value = currentUser.name;
    refInputEmail.current.value = currentUser.email;
  }, [handleUpdateInfo])

  React.useEffect(() => {
    setIsEditInfo(false);
    setIsThemeDark(true);
    values.name = currentUser.name;
    values.email = currentUser.email;
  }, [currentUser])

  function handleEditProfile() {
    setIsEditInfo(true);
    contextEditProfile.isSuccesUpdateInfo = true;
  }

  function handleSubmit() {
    handleUpdateInfo(values.email, values.name);
  }

  return (
    <section className='profile'>
      <div className='profile__content'>
        <h2 className='profile__name'>{`Привет, ` + currentUser.name}</h2>
        <form onSubmit={handleSubmit} className='form profile__form'>
          <label className="profile__label">
            <input ref={refInputName} className='profile__input profile__input_order_first' name='name' onChange={handleChange} value={values.name} minLength={2}></input>
            <span className='profile__signature'>Имя</span>
          </label>
          <div className='profile__line'></div>
          <label className="profile__label">
            <input ref={refInputEmail} className='profile__input profile__input_order_second' name='email' onChange={handleChange} value={values.email} placeholder={currentUser.email}></input>
            <span className='profile__signature'>Email</span>
          </label>
        </form>
        <div className='button__container'>
          {isEditInfo ?
            <>
              <span className='profile__error'>{contextEditProfile.isSuccesUpdateInfo ? '' : contextEditProfile.text}</span>
              <button disabled={!contextEditProfile.isSuccesUpdateInfo ? true : false} onClick={handleSubmit} className={`register__button register__button_type_registration register__button_position_profile`}>Сохранить</button>
            </>
            :
            <>
              <button disabled={!isValid} type='button' className='profile__button profile__button_type_edit' onClick={handleEditProfile}>Редактировать</button>
              <Link onClick={handleExit} className='profile__button profile__button_type_exit' to='/signin'>Выйти из аккаунта</Link>
            </>
          }
        </div>
      </div>
    </section>
  );;
}

export default Profile
