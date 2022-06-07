import React from 'react';
import logo from '../../images/logo.svg';
import '../Profile/Profile.css';
import './Register.css'
import { Link } from 'react-router-dom';

function Register() {
    return (
        <section className='register'>
            <div className='register__content'>
                <img src={logo} alt='логотип' className='register__logo'/>
                <h2 className='profile__name profile__name_position_register'>Добро пожаловать!</h2>
                <form className='form register__form'>
                    <label className='profile__label'>
                        <h3 className='label__signature'>Имя</h3>
                        <input type='text' className='register__input' value='Денис'></input>
                        <span className='register__error register__error_state_hidden'>Что-то не так</span>
                    </label>
                    <label className='profile__label'>
                        <h3 className='label__signature'>E-mail</h3>
                        <input type='email' className='register__input' value='test@mail.ru'></input>
                        <span className='register__error register__error_state_hidden'>Что-то не так</span>
                    </label>
                    <label className='profile__label'>
                        <h3 className='label__signature'>Пароль</h3>
                        <input type='password' className='register__input register__input_state_error' value='Денис'></input>
                        <span className='register__error'>Что-то не так</span>
                    </label>
                    <button className='register__button register__button_type_registration'>Зарегистрироваться</button>
                </form>
                <p className='register__text'>Уже зарегистрированы?<Link to='/signin' className='register__button register__button_type_enter'>Войти</Link></p>
            </div>
        </section>
    );
}

export default Register;