import { OFFLINE_MESSAGE, URL } from './constants.js';

export function apiGetComments(token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return fetch(URL, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    })
    .then((data) => (Array.isArray(data.comments) ? data.comments : []))
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error(OFFLINE_MESSAGE);
      }
      throw error;
    });
}

export function apiPostComment(token, text) {
  return fetch(URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text: text }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Комментарий должен быть не короче 3 символов');
      }
      if (response.status === 401) {
        throw new Error('Ошибка авторизации');
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

export function apiOnLikeClick(token, likeId) {
  return fetch(URL + `/${likeId}/toggle-like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error('Ошибка авторизации');
      }
      if (response.status !== 200) {
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
