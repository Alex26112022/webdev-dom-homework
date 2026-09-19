import * as data_comments from './data.js';
import { render } from './render.js';
import * as utils from './utils.js';

export function initEventHandlers() {
  data_comments.commentsList.addEventListener('click', onCommentsListClick);

  data_comments.addButton.addEventListener('click', () => {
    utils.addButtonClick();
    render();
  });

  data_comments.nameInput.addEventListener('focus', utils.clearErrors);
  data_comments.textInput.addEventListener('focus', utils.clearErrors);
}

function onCommentsListClick(event) {
  const likeButton = event.target.closest('.like-button');
  if (likeButton) {
    utils.onLikeClick(likeButton);
    render();
    return;
  }

  const commentEl = event.target.closest('.comment');
  if (commentEl) {
    utils.onCommentClick(commentEl);
    render();
  }
}
