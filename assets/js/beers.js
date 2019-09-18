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
	const htmlBeers = beers.map((beer, index) => {

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
};

const {getBeers} = api();

function loadPresentation(){
	
	// show presentation element sin home. Always, although it is only needed when coming to detail
	document.querySelector('.div-presentation').style.display = 'block';
	document.querySelector('#appTitle').style.display = 'block';
	
	// menu selector
	document.querySelector('#menu_home').classList.remove("active");
	document.querySelector('#menu_home').classList.add("active");
}

const renderBeersDOM = async text => {

	loadPresentation();

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
