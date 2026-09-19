import * as data_comments from './data.js';

let nextId = 2;
let replyId = null;
let reply = false;
function sanitize(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function clearErrors() {
  data_comments.nameInput.classList.remove('error-input');
  data_comments.textInput.classList.remove('error-input');
}

function addComment() {
  const name = data_comments.nameInput.value.trim();
  const text = data_comments.textInput.value.trim();

  if (!name) data_comments.nameInput.classList.add('error-input');
  if (!text) data_comments.textInput.classList.add('error-input');
  if (!name || !text) return;

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
}

function editComment() {
  data_comments.addButton.textContent = 'Написать';

  data_comments.comments.forEach((comment) => {
    if (comment.id === replyId) {
      comment.text = data_comments.textInput.value.trim();
    }
  });

  replyId = null;
  data_comments.nameInput.value = '';
  data_comments.textInput.value = '';
}

function onCommentClick(event) {
  data_comments.addButton.textContent = 'Ответить';
  const author = event.currentTarget.querySelector('.comment-header div:first-child').textContent;
  const message = event.currentTarget.querySelector('.comment-text').textContent;
  replyId = Number(event.currentTarget.dataset.id);

  data_comments.nameInput.value = author;
  data_comments.textInput.value = message + '\n> ';

  reply = true;
}

function addButtonClick() {
  clearErrors();
  if (!reply) {
    addComment();
  } else {
    editComment();
    reply = false;
  }
}

function onLikeClick(event) {
  event.stopPropagation();
  const id = Number(event.currentTarget.dataset.id);

  const comment = data_comments.comments.find((c) => c.id === id);
  if (!comment) return;

  comment.isLiked = !comment.isLiked;
  comment.likes = comment.isLiked ? comment.likes + 1 : comment.likes - 1;
}

export {
  addButtonClick,
  addComment,
  clearErrors,
  editComment,
  onCommentClick,
  onLikeClick,
  sanitize,
};
