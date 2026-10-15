import * as auth_data from './auth_data.js';
import * as auth_utils from './auth_utils.js';

export function initAuthEventHandlers() {
  const authForm = auth_data.authButton?.closest('form');
  const regForm = auth_data.regButton?.closest('form');

  authForm?.addEventListener('submit', onAuthSubmit);
  regForm?.addEventListener('submit', onRegisterSubmit);
}

function onAuthSubmit(event) {
  event.preventDefault();
  const login = auth_data.authLogin.value.trim();
  const password = auth_data.authPassword.value.trim();

  if (!login || !password) {
    alert('Заполните логин и пароль');
    return;
  }
  auth_utils.setToken(login, password);
}

function onRegisterSubmit(event) {
  event.preventDefault();
  const login = auth_data.regLogin.value.trim();
  const name = auth_data.regName.value.trim();
  const password = auth_data.regPassword.value.trim();
  if (!login || !name || !password) {
    alert('Заполните логин, имя и пароль');
    return;
  }
  auth_utils.registerUser(login, name, password);
}
