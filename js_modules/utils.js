import * as api from './api.js';
import { getName, getToken, isAuthorized, logout } from './auth_utils.js';
import { MAX_RETRY } from './constants.js';
import * as data_comments from './data.js';
import { fetchAndRender, renderComments } from './render.js';
import * as utils_view from './utils_view.js';

function addComment(attempt = 1) {
  const token = getToken();
  const text = data_comments.textInput.value.trim();

  if (!text) data_comments.textInput.classList.add('error-input');
  if (!text) return Promise.reject(new Error('validation'));

  return api
    .apiPostComment(token, text)
    .then(() => {
      data_comments.textInput.value = '';
    })
    .catch((err) => {
      if (err.message === 'Сервер сломался, попробуй позже' && attempt < MAX_RETRY) {
        return addComment(attempt + 1);
      }
      throw err;
    });
}

function onCommentClick(commentEl) {
  const author = commentEl.querySelector('.comment-header div:first-child').textContent;
  const message = commentEl.querySelector('.comment-text').textContent;

  data_comments.textInput.value = `${author}: ${message}\n> `;
  data_comments.textInput.focus();
}

function onLikeClick(buttonEl) {
  const token = getToken();
  const name = getName();
  const authorized = isAuthorized();
  const id = buttonEl.dataset.id;
  const comment = data_comments.comments.find((c) => c.id === id);

  if (!comment) return;
  if (comment.isLikeLoading) return;

  comment.isLikeLoading = true;
  renderComments(authorized, name);

  return api
    .apiOnLikeClick(token, id)
    .then((data) => {
      comment.likes = data.result.likes;
      comment.isLiked = data.result.isLiked;
      comment.isLikeLoading = false;
      renderComments(authorized, name);
    })
    .catch((err) => {
      comment.isLikeLoading = false;
      if (err.message === 'Ошибка авторизации') {
        return logout();
      }
      renderComments(authorized, name);
      console.log(err.message);
    });
}

function addButtonClick() {
  const token = getToken();
  utils_view.showLoading();
  utils_view.clearErrors();

  addComment()
    .then(() => {
      utils_view.hideLoading();
      return fetchAndRender(token, getName());
    })
    .catch((err) => {
      utils_view.hideLoading();
      if (err.message === 'Ошибка авторизации') {
        return logout();
      }
      console.log(err.message);
    });
}

export { addButtonClick, addComment, onCommentClick, onLikeClick };
