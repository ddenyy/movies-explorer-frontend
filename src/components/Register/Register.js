import React from 'react';
import logo from '../../images/logo.svg';
import '../Profile/Profile.css';
import './Register.css'
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register({ handleRegister }) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.email, values.password, values.name)
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm])

  return (
    <section className='register'>
      <div className='register__content'>
      <Link to='/'><img src={logo} alt='логотип' className='register__logo' /></Link>
        <h2 className='profile__name profile__name_position_register'>Добро пожаловать!</h2>
        <form onSubmit={handleSubmit} className='form register__form'>
          <label className='profile__label'>
            <h3 className='label__signature'>Имя</h3>
            <input required onChange={handleChange} minLength={2} name='name' type='text' className='register__input' value={values.name || ''}></input>
            <span className='register__error'>
              {errors.name || ''}
            </span>
          </label>
          <label className='profile__label'>
            <h3 className='label__signature'>E-mail</h3>
            <input onChange={handleChange} name='email' required type='email' className='register__input' value={values.email || ''}></input>
            <span className='register__error register__error_type_email'>
              {errors.email || ''}
            </span>
          </label>
          <label className='profile__label'>
            <h3 className='label__signature'>Пароль</h3>
            <input onChange={handleChange} name='password' type='password' required minLength={8} className={`register__input ${errors.password ? 'register__input_state_error' : '' }`} value={values.password || ''}></input>
            <span className='register__error'>
              {errors.password || ''}
            </span>
          </label>
          <button disabled={!isValid} className='register__button register__button_type_registration'>Зарегистрироваться</button>
        </form>
        <p className='register__text'>Уже зарегистрированы?<Link to='/signin' className='register__button register__button_type_enter'>Войти</Link></p>
      </div>
    </section>
  );
}

export default Register;