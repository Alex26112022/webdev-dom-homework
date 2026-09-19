import * as data_comments from './data.js';
import { sanitize } from './sanitize.js';

export function render() {
  data_comments.commentsList.innerHTML = '';

  data_comments.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.className = 'comment';
    li.dataset.id = comment.id;
    li.innerHTML = `
          <div class="comment-header">
            <div>${sanitize(comment.name)}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${sanitize(comment.text).replace(/\n/g, '<br><br>')}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-id="${comment.id}"></button>
            </div>
          </div>
        `;
    data_comments.commentsList.append(li);
  });
}
