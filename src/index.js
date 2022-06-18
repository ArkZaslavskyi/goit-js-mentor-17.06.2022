/*
Добавь функционал изменения темы при нажатии (событие change) на чекбокс #theme-switch-toggle в тулбаре.

По умолчанию тема светлая.
При изменении темы, необходимо добавлять на элемент body класс light-theme или dark-theme.
Выбранная тема должна сохраняться между перезагрузками страницы. Для хранения темы используй localStorage.
Если при загрузке страницы тема тёмная, не забудь поставить свойство checked у чекбокса #theme-switch-toggle в true, чтобы ползунок сдвинулся в правильное положение.

Для удобства хранения списка тем используй такое перечисление.

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

*/

import menu from './menu.json';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const STORAGE_THEME_KEY = 'theme-status';

const refs = {
  menu: document.querySelector('.js-menu'),
  switch: document.querySelector('.theme-switch__toggle')
};

const makeMenuMarkup = menu.map(makeMenuItemMarkup).join('');

refs.menu.insertAdjacentHTML('afterbegin', makeMenuMarkup);

restoreThemeStatus();

refs.switch.addEventListener('change', onSwitchChange);


// 
function onSwitchChange(e) {
  if (e.target.checked) {
    setDarkTheme();
  } else {
    setLightTheme();
  };
};

function restoreThemeStatus() {
  const themeStatus = localStorage.getItem(STORAGE_THEME_KEY);

  if (!themeStatus || themeStatus === Theme.LIGHT) {
    setLightTheme();
    refs.switch.checked = false;
  } else {
    setDarkTheme();
    refs.switch.checked = true;
  };
};

function setLightTheme() {
  localStorage.setItem(STORAGE_THEME_KEY, Theme.LIGHT);

  document.body.classList.add(Theme.LIGHT);
  document.body.classList.remove(Theme.DARK);
};

function setDarkTheme() {
  localStorage.setItem(STORAGE_THEME_KEY, Theme.DARK);

  document.body.classList.add(Theme.DARK);
  document.body.classList.remove(Theme.LIGHT);
};


// === Markup functions ===
// 

function makeMenuItemMarkup({ name, description, image, price, ingredients }) {
  return `
    <li>
      <article class="card">
        <img class="card__image" src="${image}" alt="${name}" />
        <div class="card__content">
          <h2 class="card__name">${name}</h2>
          <p class="card__price"><span class="material-icons card__price--icon">&#xe263;</span>${price}</p>
          <p class="card__descr">${description}</p>
          <ul class="tag-list">
            ${makeListOfIngredientsMarkup(ingredients)}
          </ul>
          <button class="button card__button"><span class="material-icons button__icon">&#xe8cc;</span>В корзину</button>
        </div>
      </article>
    </li>
  `;
};

function makeListOfIngredientsMarkup(ingredients) {
  return ingredients.map(makeIngredientMarkup).join('');
};

function makeIngredientMarkup(ingredient) {
  return `<li class="tag-list__item">${ingredient}</li>`;
}

//