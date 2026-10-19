import { URL_AUTHORIZATION } from './constants.js';

export function apiUserAuthorizationToken(login, password) {
  return fetch(URL_AUTHORIZATION + '/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error('Неверный логин или пароль');
      }
      throw new Error('Ошибка авторизации: HTTP ' + response.status);
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
    }
    if (response.status === 400) {
      throw new Error('Пользователь с таким логином уже существует');
    }
    throw new Error('Ошибка регистрации: HTTP ' + response.status);
  });
}
