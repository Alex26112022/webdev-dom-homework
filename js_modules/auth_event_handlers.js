import * as auth_utils from './auth_utils.js';
import * as data from './data.js';

export function initAuthEventHandlers() {
  const authForm = data.authButton?.closest('form');
  const regForm = data.regButton?.closest('form');

  authForm?.addEventListener('submit', onAuthSubmit);
  regForm?.addEventListener('submit', onRegisterSubmit);
}

function onAuthSubmit(event) {
  event.preventDefault();
  const login = data.authLogin.value;
  const password = data.authPassword.value;
  auth_utils.setToken(login, password);
}

function onRegisterSubmit(event) {
  event.preventDefault();
  const login = data.regLogin.value;
  const name = data.regName.value;
  const password = data.regPassword.value;
  auth_utils.registerUser(login, name, password);
}
