import {
	toggleClass,
	renderLoader
} from './ui.js';
import api from './api.js';

const templateBeer = ({name,image,description,beerId,firstBrewed,likes,comments }) => `
  <a href="/detail/${beerId}">
    <div class="card">
      <header class="card-header">
        <h2>${name}</h2>
      </header>
      <div class="card-content">
        <div class="card-content-image">
          <img src="${image ? image : '/src/images/default.jpg'}">
        </div>
        <div class="card-content-text">
          <p>${description}
          </p>
          <div class="rating-container">
            <i class="fa fa-calendar-o text-highlight" aria-hidden="true"></i> ${firstBrewed} &nbsp;&nbsp;
            <i class="fa fa-heart-o text-highlight" aria-hidden="true"></i> ${likes} &nbsp;&nbsp;
            <i class="fa fa-comment-o text-highlight" aria-hidden="true"></i> ${comments.length} &nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  </a>
`;

const renderBeers = (element, beers) => {
	let htmlBeers = beers.slice(0, 10).map((beer, index) => {

		return templateBeer({
			...beer,
			principal: false
		});
	}).join('');

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
	document.querySelector('#menu_home').classList.remove("active");
	document.querySelector('#menu_home').classList.add("active");
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
function beersByYear(beers, year) {

	// const filter = beers.filter(beer => beer.likes > 0);
	const filter = beers.filter(beer => beer.firstBrewed.split('/')[1] == year);
	
	return filter.sort(function (a, b) {return parseInt(a.firstBrewed.split('/')[0]) - parseInt(b.firstBrewed.split('/')[0]);});
}

const renderBeersDOM = async text => {

	loadPresentation();

	try {
		renderLoader('hide', 'beer');
		const mainSection = document.querySelector('main');

		/********************************************************************* 
				SEARCH throw API if text is not a valid year; else use array.filter(beer.firstBrewed)				
		*********************************************************************/
		
		// let items = [];
		
		// if (isValidYear(text)){
		// 	items = await getBeers();
		// 	items = beersByYear(items, text);
		// } else {
		// 	items = await getBeers(text);
		// }

		const items = isValidYear(text) ? beersByYear(await getBeers(), text) : await getBeers(text); // uf!!! esto sí que vale una cerveza!!!!

		renderBeers(mainSection, items);
	} catch (err) {
		console.error(err);
	} finally {
		renderLoader('beer', 'hide');
	}
};

export {
	renderBeersDOM
};
