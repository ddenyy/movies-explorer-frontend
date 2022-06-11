import React from 'react';
import './InfoTooltip.css';
import {infoToolTipContext} from '../../context/infoToolTipContext.js';

function InfoTooltip({ onClose, useEscapePress }) {
  const Context = React.useContext(infoToolTipContext);
  // useEscapePress(onClose, infoToolTipContext.isOpen);

  return (
    <div className={`popup ${Context.isOpen && "popup_opened"}`}>
      <div className="popup__window">
        <button type="button" className={`popup__button-exit`} onClick={onClose}></button>
        <div className={`popup__picture_access ${Context.isSucces ? "" : "popup__picture_access_error"}`}></div>
        <p className="popup__title_access">{Context.text}</p>
      </div>
    </div>
  );

}


export default InfoTooltip;
