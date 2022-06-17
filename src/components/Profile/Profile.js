import React, { useState, useRef, useContext, useEffect } from "react";
import './Profile.css';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import '../Register/Register.css'
import { infoToolTipContext } from '../../context/infoToolTipContext.js';
import { currentUserContext } from "../../context/CurrentUserContext";
import Header from "../Header/Header";

function Profile({ autorized, handleOnClickBurger, isOpenBurger, onClose, handleUpdateInfo, handleExit }) {
  const contextPopupEditProfile = useContext(infoToolTipContext);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isDisabledBtn, setIsDisabledBtn] = useState(!contextPopupEditProfile.isSuccesUpdateInfo);
  const refInputName = useRef();
  const refInputEmail = useRef();
  const currentUser = useContext(currentUserContext);
  const { values, handleChange, isValid } = useFormWithValidation();

  // через ref обращаемся напрямую к инпутам и ставим им значение текущего пользователя
  useEffect(() => {
    refInputName.current.value = currentUser.name;
    refInputEmail.current.value = currentUser.email;
  }, [handleUpdateInfo])

  useEffect(() => {
    setIsEditInfo(false);
    values.name = currentUser.name;
    values.email = currentUser.email;
  }, [currentUser])

  useEffect(() => {
    setErrorText('')
    setIsDisabledBtn(false);
  }, [values.name, values.email])

  function handleEditProfile() {
    setIsEditInfo(true);
    contextPopupEditProfile.isSuccesUpdateInfo = true;
  }

  function handleSubmit() {
    if ((values.email != currentUser.email) || (values.name != currentUser.name)) {
      handleUpdateInfo(values.email, values.name);
      setErrorText('')
      setIsDisabledBtn(false);
    } else {
      contextPopupEditProfile.isSuccesUpdateInfo = false;
      setIsDisabledBtn(true);
      setErrorText('изменённые данные должны отличаться от текущих!');
    }
  }

  return (
    <>
      <Header
        autorized={autorized}
        themeDark={true}
        handleOnClickBurger={handleOnClickBurger}
        isOpenBurger={isOpenBurger}
        onClose={onClose}
      />
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
                <span className='profile__error'>{errorText}</span>
                <button disabled={isDisabledBtn} onClick={handleSubmit} className='register__button register__button_type_registration register__button_position_profile'>Сохранить</button>
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
    </>
  );;
}

export default Profile
