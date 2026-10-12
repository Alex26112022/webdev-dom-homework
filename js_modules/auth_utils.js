import { apiUserAuthorizationToken } from './api_auth.js';
import { ADMIN_MARKER } from './constants.js';

export function getToken() {
  return localStorage.getItem('token');
}

export function getName() {
  return localStorage.getItem('name');
}

export function setToken(login, password) {
  return apiUserAuthorizationToken(login, password).then(({ token, name }) => {
    if (getToken() !== token) {
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
    }
  });
}

// TODO - костыль (апи по-хорошему должен возвращать флаг об успешной авторизации, но этого не реализовано на беке)
export function isUnauthorizedPayload(comments) {
  return (
    comments.length === 1 &&
    comments[0]?.author?.name === ADMIN_MARKER.name &&
    comments[0]?.author?.login === ADMIN_MARKER.login &&
    comments[0]?.isLiked === false
  );
}

// TODO - вынужденная реализация (плохой подход)
export function isAuthorized() {
  return Boolean(getToken());
}
