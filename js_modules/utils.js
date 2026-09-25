import * as data_comments from './data.js';
import { fetchAndRender } from './render.js';

function clearErrors() {
  data_comments.nameInput.classList.remove('error-input');
  data_comments.textInput.classList.remove('error-input');
}

function addComment() {
  const name = data_comments.nameInput.value.trim();
  const text = data_comments.textInput.value.trim();

  if (!name) data_comments.nameInput.classList.add('error-input');
  if (!text) data_comments.textInput.classList.add('error-input');
  if (!name || !text) return Promise.reject(new Error('validation'));

  return fetch('https://wedev-api.sky.pro/api/v1/alexey-denisenko/comments', {
    method: 'POST',
    body: JSON.stringify({ text, name }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    })
    .then(() => {
      data_comments.nameInput.value = '';
      data_comments.textInput.value = '';
    });
}

function dateConvert(date) {
  return new Date(date).toLocaleString('ru-RU', data_comments.dateOptions).replace(',', '');
}

function onCommentClick(commentEl) {
  const author = commentEl.querySelector('.comment-header div:first-child').textContent;
  const message = commentEl.querySelector('.comment-text').textContent;

  data_comments.textInput.value = `${author}: ${message}\n> `;
  data_comments.textInput.focus();
}

function onLikeClick(buttonEl) {
  const id = Number(buttonEl.dataset.id);
  const comment = data_comments.comments.find((c) => c.id === id);
  if (!comment) return;
  comment.isLiked = !comment.isLiked;
  comment.likes += comment.isLiked ? 1 : -1;
}

function addButtonClick() {
  clearErrors();
  addComment()
    .then(() => fetchAndRender())
    .catch((err) => console.error('Комментарий не добавлен:', err.message));
}

export { addButtonClick, addComment, clearErrors, dateConvert, onCommentClick, onLikeClick };
