import * as data_comments from './js_modules/data.js';
import { initEventHandlers } from './js_modules/event_handlers.js';
import { fetchAndRender } from './js_modules/render.js';

fetchAndRender().catch((err) => {
  console.error('Не удалось загрузить комментарии:', err.message);
  data_comments.commentsList.innerHTML = '<p class="loading">Не удалось загрузить комментарии</p>';
});

initEventHandlers();
