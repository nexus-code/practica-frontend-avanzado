import { renderBeersDOM } from './beers.js';
import storage from './storage.js';

const { setItem, getItem } = storage('cookieStorage');

const searchButton  = document.querySelector('#searchButton');
const resetButton   = document.querySelector('#resetButton');
const searchInput   = document.querySelector('#searchInput');

searchInput.value = getItem('search');

searchButton.addEventListener('click', (evt) => {

	evt.preventDefault();

	if (searchInput.value.length > 3) {

		setItem('search', searchInput.value);
		renderBeersDOM(searchInput.value);
	}
});

resetButton.addEventListener('click', (evt) => {
  
  evt.preventDefault();
  
  searchInput.value = '';
  setItem('search', searchInput.value);
  renderBeersDOM();
});