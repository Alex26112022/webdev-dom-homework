import { URL_AUTHORIZATION } from './constants.js';

export function apiUserAuthorizationToken(login, password) {
  return fetch(URL_AUTHORIZATION, {
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
