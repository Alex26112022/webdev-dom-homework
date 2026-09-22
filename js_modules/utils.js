import * as data_comments from './data.js';
import { render } from './render.js';

let nextId = 2;

function clearErrors() {
  data_comments.nameInput.classList.remove('error-input');
  data_comments.textInput.classList.remove('error-input');
}

function addComment() {
  const name = data_comments.nameInput.value.trim();
  const text = data_comments.textInput.value.trim();

  if (!name) data_comments.nameInput.classList.add('error-input');
  if (!text) data_comments.textInput.classList.add('error-input');
  if (!name || !text) return false;

  const now = new Date();
  const date = now.toLocaleString('ru-RU', data_comments.dateOptions).replace(',', '');

  data_comments.comments.push({
    id: nextId++,
    name: name,
    date: date,
    text: text,
    likes: 0,
    isLiked: false,
  });

  data_comments.nameInput.value = '';
  data_comments.textInput.value = '';
  return true;
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
  addComment();
  render();
}

export { addButtonClick, addComment, clearErrors, onCommentClick, onLikeClick };
