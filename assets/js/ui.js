import './navbar.js';

const toggle = elemento =>
	(removeClass, addClass) => {
		elemento.classList.remove(removeClass);
		elemento.classList.add(addClass);
	};

const displayElement = selector => display => {
	const element = document.querySelector(selector);
	element.style.display = display;
};


const handleForm = displayElement('#detailSection');

const main = document.querySelector('main');

export const handleMainContainer = toggle(main);

const loader = document.getElementById('loader');

export const renderLoader = toggle(loader)




/************************************************************************************************************************* */
// generic ui functions

window.addEventListener('scroll', function () {

	const logo = document.getElementById('logo');
	const appSubTitle = document.querySelector('#appSubTitle');
	var appSubTitlePos = appSubTitle.getBoundingClientRect(); // appSubTitle element Position. DIV & H1 has top = 0!

	if (appSubTitlePos.top < 10) {
		logo.style.display = 'block';
	} else {
		logo.style.display = 'none';
	}
});