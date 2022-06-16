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

  getAllSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then(this._checkResponse)
  }

  saveMovies(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        'country': `${movie.country === null ? 'none' : movie.country}`,
        'director': movie.director,
        'duration': movie.duration,
        'year': movie.year,
        'description': movie.description,
        'image': `https://api.nomoreparties.co/${movie.image.url}`,
        'trailerLink': movie.trailerLink,
        'nameRU': `${movie.nameRU === '' ? 'none' : movie.nameRU}`,
        'nameEN': `${movie.nameEN === '' ? 'none' : movie.nameEN}`,
        'thumbnail': `${movie.image.formats.thumbnail.url === null ? 'https://api.nomoreparties.co/none' : `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}`,
        'movieId': movie.id,
      })
    })
      .then(this._checkResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
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