import * as auth_utils from './auth_utils.js';
import * as data from './data.js';

export function initAuthEventHandlers() {
  data.authButton.addEventListener('click', onAuthClick);
}

function onAuthClick() {
  const login = data.authLogin.value;
  const password = data.authPassword.value;
  auth_utils.setToken(login, password);
}
