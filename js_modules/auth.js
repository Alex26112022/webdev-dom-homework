import { apiUserAuthorizationToken } from './api_auth.js';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken() {
  return apiUserAuthorizationToken().then((token) => {
    if (getToken() !== token) {
      localStorage.setItem('token', token);
    }
  });
}
