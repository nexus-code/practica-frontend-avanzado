import api from './api.js';

const { getBeerDetail } = api();



const detailTemplate = ({ beerId, name, brewersTips, description, image, firstBrewed, price, likes, comments }) => `
    <div class="detail-card" id="detail">
      <header class="detail-card-header" id="${beerId}">
        <h2>${name}</h2>
        <h3><i class="fa fa-quote-left" aria-hidden="true"></i> ${brewersTips} <i class="fa fa-quote-right" aria-hidden="true"></i></h3>
      </header>
      <div class="detail-card-content">
        <div class="detail-card-content-image">
          <img src="${image ? image : '/src/images/default.jpg'}">
          <br>
          <button>I like</button>
        </div>
        <div class="detail-card-content-text">
          <div class="rating-container">
            <i class="fa fa-usd text-grey" aria-hidden="true"></i> ${price}&nbsp;&nbsp;
            <i class="fa fa-calendar-o text-grey" aria-hidden="true"></i> ${firstBrewed}&nbsp;&nbsp;
            <i class="fa fa-heart-o text-grey" aria-hidden = "true"></i> <span id="likes">${likes}</span>&nbsp;&nbsp;
            <i class="fa fa-comment-o text-grey" aria-hidden="true"></i> ${comments.length}
          </div>
          <p>${description}</p>
        </div>
      </div>
    </div>
`;

function hidePresentation() {

  // hide presentation elements in home
  document.querySelector('.div-presentation').style.display = 'none';
  document.querySelector('#appTitle').style.display = 'none';
}

export const renderDetail = async id => {
  
	hidePresentation();
  
	try {
		// const [beer, quotes] = await Promise.all([getBeerDetail(id), getQuotes(id)]);
		// renderQuotes(quotes);
		const [beerTmp] = await Promise.all([getBeerDetail(id)]);
		const beer = beerTmp.beer;
		const beerHTML = detailTemplate(beer);
		document.querySelector('main').innerHTML = beerHTML;
	} catch (e) {
		console.error(e);
	} finally {
		window.scrollTo(0, 0);
	}
};
