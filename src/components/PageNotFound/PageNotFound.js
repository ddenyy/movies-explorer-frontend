import React from "react";
import { useHistory } from 'react-router-dom';

import './PageNotFound.css'
function PageNotFound () {
    const history = useHistory();
    
    function handleClick() {
        history.goBack();
    }
    return(
        <section className='page-not-found'>
            <p className='page-not-found__text page-not-found__text_type_number'>404</p>
            <p className='page-not-found__text'>Страница не найдена</p>
            <button className='page-not-found__button' onClick={handleClick}>Назад</button>
        </section>
    );
}

export default PageNotFound;