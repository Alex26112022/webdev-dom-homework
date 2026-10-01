import { dateOptions } from './data.js';

export function dateConvert(date) {
  return new Date(date).toLocaleString('ru-RU', dateOptions).replace(',', '');
}
