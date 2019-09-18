import { renderBeersDOM } from './beers.js';
import storage from './storage.js';

const { setItem, getItem } = storage('cookieStorage');

const searchButton = document.querySelector('#searchButton');
const searchInput  = document.querySelector('#searchInput');

searchInput.value = getItem('search');

searchButton.addEventListener('click', (evt) => {
  
  
	evt.preventDefault();
  
	console.log('searchInput.value', searchInput.value);
  

	if (searchInput.value.length > 3) {
	
		setItem('search', searchInput.value);
		renderBeersDOM(searchInput.value);
	}
});

