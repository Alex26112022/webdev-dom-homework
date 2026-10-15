const comments = [];

const commentsList = document.querySelector('.comments');
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');
const addForm = document.querySelector('.add-form');
const loadingComment = document.querySelector('.loading-comment');
const authMessage = document.querySelector('.auth-message');

const dateOptions = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

export {
  addButton,
  addForm,
  authMessage,
  comments,
  commentsList,
  dateOptions,
  loadingComment,
  nameInput,
  textInput,
};
