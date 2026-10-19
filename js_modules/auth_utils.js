import { apiUserAuthorizationToken, apiUserRegistration } from './api_auth.js';

export function getToken() {
  return localStorage.getItem('token');
}

export function getName() {
  return localStorage.getItem('name');
}

export function setToken(login, password) {
  return apiUserAuthorizationToken(login, password)
    .then(({ token, name }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      window.location.href = '/';
    })
    .catch((err) => {
      alert(err.message);
    });
}

export function registerUser(login, name, password) {
  return apiUserRegistration(login, name, password)
    .then(() => {
      window.location.href = '/authorization.html';
    })
    .catch((err) => {
      alert(err.message);
    });
}

export function isAuthorized() {
  return Boolean(getToken());
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  alert('Сессия истекла, войдите заново');
  window.location.reload();
}
