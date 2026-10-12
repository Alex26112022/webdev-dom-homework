const comments = [];

const commentsList = document.querySelector('.comments');
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');
const addForm = document.querySelector('.add-form');
const loadingComment = document.querySelector('.loading-comment');
const authMessage = document.querySelector('.auth-message');
const authButton = document.getElementById('auth-button');
const authLogin = document.getElementById('auth-login');
const authPassword = document.getElementById('auth-password');

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
  authButton,
  authLogin,
  authMessage,
  authPassword,
  comments,
  commentsList,
  dateOptions,
  loadingComment,
  nameInput,
  textInput,
};
