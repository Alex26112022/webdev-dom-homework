import { URL_AUTHORIZATION } from './constants.js';

export function apiUserAuthorizationToken(login, password) {
  return fetch(URL_AUTHORIZATION + '/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        alert('Ошибка авторизации');
        return Promise.reject(new Error('Ошибка авторизации'));
      }
    })
    .then((data) => {
      const token = data.user.token;
      const name = data.user.name;
      return { token, name };
    });
}

export function apiUserRegistration(login, name, password) {
  return fetch(URL_AUTHORIZATION, {
    method: 'POST',
    body: JSON.stringify({ login, name, password }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 400) {
      alert('Пользователь с таким логином уже сущетсвует');
      return Promise.reject(new Error('Пользователь с таким логином уже сущетсвует'));
    } else {
      alert('Ошибка регистрации');
      return Promise.reject(new Error('Ошибка регистрации'));
    }
  });
}
