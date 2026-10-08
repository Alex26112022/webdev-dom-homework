import { getName, getToken } from './js_modules/auth.js';
import * as data_comments from './js_modules/data.js';
import { initEventHandlers } from './js_modules/event_handlers.js';
import { fetchAndRender } from './js_modules/render.js';

const token = getToken();
const name = getName();

fetchAndRender(token, name, true).catch((err) => {
  console.error('Не удалось загрузить комментарии:', err.message);
  data_comments.commentsList.innerHTML =
    '<li class="loading text">Не удалось загрузить комментарии</li>';
});

initEventHandlers();
