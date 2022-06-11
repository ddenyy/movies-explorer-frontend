// https://api.deosmovies-explorer.nomoreparties.sbs

import InfoTooltip from "../components/InfoTooltip/InfoTooltip";

class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
  // {message: res.message, status: `ошибка ${res.status}`}
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  };

  updateUserInfo(newData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
      })
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.deosmovies-explorer.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api;