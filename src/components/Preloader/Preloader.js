import React from 'react'
import './Preloader.css'

const Preloader = ( {isOpen}) => {
    return (
        <div className={`preloader ${isOpen ? 'preloader_state_open' : ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
