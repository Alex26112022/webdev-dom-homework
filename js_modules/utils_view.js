import * as data_comments from './data.js';

function clearErrors() {
  data_comments.nameInput.classList.remove('error-input');
  data_comments.textInput.classList.remove('error-input');
}

function showLoading() {
  data_comments.addForm.classList.add('is-hidden');
  data_comments.loadingComment.classList.remove('is-hidden');
}

function hideLoading() {
  data_comments.addForm.classList.remove('is-hidden');
  data_comments.loadingComment.classList.add('is-hidden');
}

function showAuthAndForm() {
  data_comments.addForm.classList.add('is-hidden');
  data_comments.authMessage.classList.remove('is-hidden');
}

function hideAuthAndForm() {
  data_comments.addForm.classList.remove('is-hidden');
  data_comments.authMessage.classList.add('is-hidden');
}

function viewAuthAndForm(authorized) {
  if (authorized) {
    hideAuthAndForm();
  } else {
    showAuthAndForm();
  }
}

export { clearErrors, hideLoading, showLoading, viewAuthAndForm };
