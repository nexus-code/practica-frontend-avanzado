import api from './api.js';

const templateBeer = ({name, image, description, beerId, firstBrewed, likes, comment }) => {

	// beer.comments is empty. When a comment is added, API create property comment[]
	const commentsLength = (typeof comment == 'undefined') ? 0 : comment.length;

	return `<a href="/detail/${beerId}" id="hrefDetail">
				<div class="card">
				<header class="card-header">
					<h2>${name}</h2>
				</header>
				<div class="card-content">
					<div class="card-content-image">
						<img src="${image ? image : '/src/images/default.jpg'}" alt="${name}">
					</div>
					<div class="card-content-text">
					<p>${description}
					</p>
					<div class="rating-container">
						<i class="fa fa-calendar-o text-highlight" aria-hidden="true"></i> ${firstBrewed} &nbsp;&nbsp;
						<i class="fa fa-heart-o text-highlight" aria-hidden="true"></i> ${likes} &nbsp;&nbsp;
						<i class="fa fa-comment-o text-highlight" aria-hidden="true"></i> ${commentsLength} &nbsp;&nbsp;
					</div>
					</div>
				</div>
				</div>
			</a>`;
};

const renderBeers = (element, beers) => {

	let htmlBeers = beers.slice(0, 10).map(beer => templateBeer({...beer})).join('');

	if (htmlBeers == '') 
		htmlBeers = '<div class="beers-404"> This is a terrible 404!! <span>We don´t have that beer!</span></div>';

	element.innerHTML = `
		<div class="beer-section">
		${htmlBeers}
		</div>
	`;
};

const {getBeers} = api();

function loadPresentation(){
	
	// show presentation elements in home. Always, although it is only needed when coming to detail
	document.querySelector('.div-presentation').style.display = 'block';
	document.querySelector('#appTitle').style.display = 'block';
	
	// menu selector
	document.querySelector('#menuHome').classList.remove('active');
	document.querySelector('#menuHome').classList.add('active');
}

function hideImgPresentation() {

	// hide img presentation on searchs
	document.querySelector('.div-presentation').style.display = 'none';
}

// return if value is a year between 1800 & current
function isValidYear(value) {

	if(isNaN(value)){
		return false;
	}
	
	const intValue = parseInt(value); 

	if (!Number.isInteger(intValue)) {
		return false;
	}
	
	const d = new Date();
	const currentYear = d.getFullYear();
	
	return (intValue > 1800) && (intValue <= currentYear);
}

// return beers filter by year on firstBrewed
function filterByYear(beers, year) {

	const filter = beers.filter(beer => beer.firstBrewed.split('/')[1] == year);
	
	return filter.sort(function (a, b) { return parseInt(a.firstBrewed.split('/')[0]) - parseInt(b.firstBrewed.split('/')[0]); });
}

// return most valued beers: beers with likes > 0 order by likes 
function mostValued(beers) {

	const filter = beers.filter(beer => beer.likes > 0);

	return filter.sort(function (a, b) { return b.likes - a.likes; });
}

// return latests beers: 
function latests(beers) {

	return beers.sort(function (a, b) { return parseInt(b.firstBrewed.split('/')[1]) - parseInt(a.firstBrewed.split('/')[1]); });
}

export const renderBeersDOM = async query => {

	if (typeof query == 'undefined')
		loadPresentation();
	else
		hideImgPresentation();

	try {
		const mainSection = document.querySelector('main');

		/********************************************************************* 
				SEARCH throw API if query is not a valid year; else use array.filter(beer.firstBrewed)				
		*********************************************************************/
		
		// v1: // const items = isValidYear(query) ? filterByYear(await getBeers(), query) : await getBeers(query); // uf!!! esto sí que se merece una cerveza!!!!
		
		let items = [];
		
		if (query == 'bfMostValued') {

			items = await getBeers();
			items = mostValued(items);

		} else if (query == 'bfLatests') {

			items = await getBeers();
			items = latests(items);

		} else if (isValidYear(query)) {
			
			items = await getBeers();
			items = filterByYear(items, query);

		} else {
			
			items = await getBeers(query);
		}

		renderBeers(mainSection, items);
	} catch (err) {
		console.error(err);
	} 
};