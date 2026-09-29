import * as api from './api.js';
import * as data_comments from './data.js';
import { dateConvert } from './format.js';
import { sanitize } from './sanitize.js';

export function renderComments() {
  data_comments.commentsList.innerHTML = '';

  data_comments.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.className = 'comment';
    li.dataset.id = comment.id;
    li.innerHTML = `
      <div class="comment-header">
        <div>${sanitize(comment.author.name)}</div>
        <div>${dateConvert(comment.date)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${sanitize(comment.text).replace(/\n/g, '<br><br>')}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''} ${comment.isLikeLoading ? '-loading-like' : ''}" data-id="${comment.id}"></button>
        </div>
      </div>
    `;
    data_comments.commentsList.append(li);
  });
}

export function fetchAndRender(showLoading = true) {
  if (showLoading) {
    data_comments.commentsList.innerHTML = '<li class="loading">Загрузка комментариев...</li>';
  }
  return api.apiGetComments().then((comments) => {
    data_comments.comments.length = 0;
    data_comments.comments.push(...comments);
    renderComments();
  });
}
