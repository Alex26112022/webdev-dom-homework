const comments = [];

const commentsList = document.querySelector('.comments');
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');

const dateOptions = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

export { addButton, comments, commentsList, dateOptions, nameInput, textInput };
