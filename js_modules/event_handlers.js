import * as data_comments from './data.js';
import * as utils from './utils.js';
import * as utils_view from './utils_view.js';

export function initEventHandlers() {
  data_comments.commentsList.addEventListener('click', onCommentsListClick);
  data_comments.addButton.addEventListener('click', utils.addButtonClick);
  data_comments.textInput.addEventListener('focus', utils_view.clearErrors);
}

function onCommentsListClick(event) {
  const likeButton = event.target.closest('.like-button');
  if (likeButton) {
    utils.onLikeClick(likeButton);
    return;
  }

  const commentEl = event.target.closest('.comment');
  if (commentEl) {
    utils.onCommentClick(commentEl);
  }
}
