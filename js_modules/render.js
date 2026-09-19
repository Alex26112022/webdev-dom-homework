import * as data_comments from './data.js';
import * as utils from './utils.js';

export function render() {
  data_comments.commentsList.innerHTML = '';

  data_comments.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.className = 'comment';
    li.dataset.id = comment.id;
    li.innerHTML = `
          <div class="comment-header">
            <div>${utils.sanitize(comment.name)}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${utils.sanitize(comment.text).replace(/\n/g, '<br><br>')}</div>
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
