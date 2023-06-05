// класс запросов на сервер
export const servAdress = 'https://api.satip1.nomoredomains.xyz';

 class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // контроль положительного ответа и возврата тела запроса
  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  }

 // контроль положительного ответа и возврата тела запроса
  _checkResponse1(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка карточек${res}`);
  }

  // получить данные профиля пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse)
  }

  // получение карточек для инициализации
  getInitCard() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse)
  }

  // сохранение профиля пользователя
  setProfileSave(newName, newAbout) {
    const option = {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      })
    }
    return fetch(`${this._baseUrl}/users/me`, option)
      .then(this._checkResponse)
  }

  // отправка на сайт новой карточки
  recordNewCard(name, link) {
    const option = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }
    return fetch(`${this._baseUrl}/cards`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }

  deleteCurrentCard(id) {
    const option = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
    return fetch(`${this._baseUrl}/cards/${id}`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }

  // обновление фото пользователя на сайте
  recordNewAvatar(link) {
    const option = {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link
      })
    }
    return fetch(`${this._baseUrl}/users/me/avatar`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }

  // добавить лайк карточке
  addLike(id) {
    const option = {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
    return fetch(`${this._baseUrl}/cards/${id}/likes`, option)
      .then(this._checkResponse)
      // .then(result => result)
  }
  // удалить лайк с карточки
  deletLike(id) {
    const option = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
    return fetch(`${this._baseUrl}/cards/${id}/likes`, option)
      .then(this._checkResponse)
      // .then(result => result);
  }

  changeLikeCardStatus(id, like) {
    if (like) {
      const option = {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      return fetch(`${this._baseUrl}/cards/${id}/likes`, option)
        .then(this._checkResponse)
    }
    else {
      const option = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      return fetch(`${this._baseUrl}/cards/${id}/likes`, option)
        .then(this._checkResponse)
    }
  }
}

export const api = new Api(servAdress);
















