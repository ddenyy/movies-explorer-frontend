import React from "react";
import logo from '../../images/logo.svg';
import '../Profile/Profile.css';
import '../Register/Register.css';
import './Login.css';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';


function Login({ handleLogin, setIsThemeDark, setIsShowHeader }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  React.useEffect(() => {
    setIsShowHeader(false);
  }, [])

  React.useEffect(() => {
    resetForm();
    setIsThemeDark(true)
  }, [resetForm])

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password, values.name)
  }

  return (
    <section className='register'>
      <div className='register__content'>
        <img src={logo} alt='логотип' className='register__logo' />
        <h2 className='profile__name profile__name_position_register'>Рады видеть!</h2>
        <form onSubmit={handleSubmit} className='form register__form'>
          <label className='profile__label'>
            <h3 className='label__signature'>E-mail</h3>
            <input type='email' name='email' className='register__input ' value={values.email || ''} onChange={handleChange}></input>
            <span className='register__error register__error_type_email'>
              {errors.email || ''}
            </span>
          </label>
          <label className='profile__label'>
            <h3 className='label__signature'>Пароль</h3>
            <input type='password' name='password' required minLength={8} className={`register__input ${errors.password ? 'register__input_state_error' : ''} `} value={values.password || ''} onChange={handleChange}></input>
            <span className='register__error'>
              {errors.password || ''}
            </span>
          </label>
          <button className='register__button register__button_type_registration register__button_position_login'>Войти</button>
        </form>
        <p className='register__text'>Ещё не зарегистрированы?<Link to='/signup' className='register__button register__button_type_enter'>Регистрация</Link></p>
      </div>
    </section>
  );
}

export default Login;