const URL = 'https://wedev-api.sky.pro/api/v1/alexey-denisenko/comments';

export function apiGetComments() {
  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    })
    .then((data) => data.comments);
}

export function apiPostComment(text, name) {
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ text, name }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    return response.json();
  });
}
