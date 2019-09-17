import {
	toggleClass,
	renderLoader
} from './ui.js';
import api from './api.js';

const templateBeer = ({
	name,
	image,
	description,
	id,
	firstBrewed,
	likes,
	comments
}) => `
  <a href="/detail/${id}">
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
	const htmlBeers = beers.slice(0, 10).map((beer, index) => {
		// if (index < 2) {
		// 	return templateBeer({
		// 		...beer,
		// 		principal: true
		// 	});
		// }
		return templateBeer({
			...beer,
			principal: false
		});
	}).join('');
	element.innerHTML = `
    <div class="beer-section">
      ${htmlBeers}
    </div>
  `;
	// codigo para manejar los header
	const headers = document.querySelectorAll('.card.secondary .card-header');
	headers.forEach(header => {
		const element = header.parentNode;
		header.addEventListener('click', evt => {
			evt.preventDefault();
			toggleClass(element, 'close');
		});
	});
};

const {getBeers} = api();

const renderBeersDOM = async text => {
	try {
		renderLoader('hide', 'beer');
		const mainSection = document.querySelector('main');
		const items = await getBeers(text);
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
