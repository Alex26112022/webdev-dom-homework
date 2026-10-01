import { URL_AUTHORIZATION } from './constants.js';

export function apiUserAuthorizationToken(login = 'admin', password = 'admin') {
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
      return data.token;
    })
    .catch((error) => {
      console.log(error);
    });
}
