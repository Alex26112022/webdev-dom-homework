import { URL_AUTHORIZATION } from './constants.js';

export function apiUserAuthorizationToken(login, password) {
  return fetch(URL_AUTHORIZATION, {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const token = data.user.token;
      const name = data.user.name;
      return { token, name };
    })
    .catch((error) => {
      console.log(error);
    });
}
