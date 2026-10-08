import { isUnauthorizedPayload } from './auth.js';
import { OFFLINE_MESSAGE, URL } from './constants.js';

export function apiGetComments(token) {
  return fetch(URL, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error(OFFLINE_MESSAGE);
      }
      throw error;
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      const comments = Array.isArray(data.comments) ? data.comments : [];
      const authorized = !isUnauthorizedPayload(comments);
      return { comments, authorized };
    });
}

export function apiPostComment(text, name) {
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ text, name, forceError: true }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Имя и комментарий должны быть не короче 3 символов');
      }
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже');
      }
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error(OFFLINE_MESSAGE);
      }
      throw error;
    });
}
