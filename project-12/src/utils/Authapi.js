// запросы для регистрации и входа на сайт

const servUrl = 'https://auth.nomoreparties.co';

// регистрация на сайте
export const setRegister = (email, pass) => {
  return fetch(`${servUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "password": pass, "email": email })
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    })
}

// авторизация на сайте и получение токена
export const getAuthorization = (email, pass) => {
  return fetch(`${servUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "password": pass, "email": email })
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    })
}

// валидация токена
export const getValidToken = (jwt) => {
  return fetch(`${servUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    })
}













