import { OFFLINE_MESSAGE, URL } from './constants.js';

export function apiGetComments() {
  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    })
    .then((data) => data.comments)
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error(OFFLINE_MESSAGE);
      }
      throw error;
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
