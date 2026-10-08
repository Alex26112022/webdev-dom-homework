import { apiUserAuthorizationToken } from './api_auth.js';
import { ADMIN_MARKER } from './constants.js';

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

export function isUnauthorizedPayload(comments) {
  return (
    comments.length === 1 &&
    comments[0]?.author?.name === ADMIN_MARKER.name &&
    comments[0]?.author?.login === ADMIN_MARKER.login &&
    comments[0]?.isLiked === false
  );
}
