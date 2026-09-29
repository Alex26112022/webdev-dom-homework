import * as api from './api.js';
import * as data_comments from './data.js';
import { fetchAndRender, renderComments } from './render.js';

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

  return api.apiPostComment(text, name).then(() => {
    data_comments.nameInput.value = '';
    data_comments.textInput.value = '';
  });
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
  if (comment.isLikeLoading) return;

  comment.isLikeLoading = true;
  renderComments();

  return delay(1000).then(() => {
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
    comment.isLikeLoading = false;
    renderComments();
  });
}

function showLoading() {
  data_comments.addForm.classList.add('is-hidden');
  data_comments.loadingComment.classList.remove('is-hidden');
}

function hideLoading() {
  data_comments.addForm.classList.remove('is-hidden');
  data_comments.loadingComment.classList.add('is-hidden');
}

function addButtonClick() {
  showLoading();
  clearErrors();

  addComment()
    .then(() => {
      hideLoading();
      return fetchAndRender(false);
    })
    .catch((err) => {
      hideLoading();
      alert(err.message);
    });
}

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export { addButtonClick, addComment, clearErrors, onCommentClick, onLikeClick };
