const navbar = document.getElementById('navbar');
// const navbarLogo = document
// 	.querySelector('.navbar-logo');
// const searchIcon = document
// 	.getElementById('navbar-search');
// const closeIcon = document
// 	.getElementById('navbar-close');

const toggle = elemento =>
	(removeClass, addClass) => {
		elemento.classList.remove(removeClass);
		elemento.classList.add(addClass);
	};

// const navbarVariable = toggle(navbar);

// searchIcon.addEventListener('click', () =>
// 	navbarVariable('no-search', 'search'));

// closeIcon.addEventListener('click', () =>
// 	navbarVariable('search', 'no-search'));

// const openHeader = id => evt => {
// 	console.log(evt);
// 	evt.preventDefault();
// 	const elemento = document.getElementById(id);
// 	elemento.classList.toggle('close');
// };

const displayElement = selector => display => {
	const element = document.querySelector(selector);
	element.style.display = display;
};

const handleFilter = toggle(navbar);

const handleForm = displayElement('#detailSection');

const main = document.querySelector('main');

const handleMainContainer = toggle(main);

const loader = document.getElementById('loader');

const renderLoader = toggle(loader);

export {
	// openHeader,
	handleFilter,
	handleForm,
	renderLoader,
	handleMainContainer,
};
