import api from './api.js';
// import './js/quoteForm';

// const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1';

const { getBeerDetail } = api();
// const { getQuotes } = api(QUOTES_API);

// const quoteTemplate = ({ quote }) => `
//   <div class="list-item">
//     <p>${quote}</p>
//   </div>
// `;

// const renderQuotes = newQuotes => {
//   let quotesTemplate = '<div>There is no quotes</div>';
//   if (newQuotes.length > 0) {
//     quotesTemplate = newQuotes.map(quote => quoteTemplate(quote)).join('');
//   }
//   const quoteElement = document.getElementById('quoteList');
//   quoteElement.innerHTML = quotesTemplate;
// };

// const detailTemplate = ({ beerId, name, description, image, firstBrewed, likes, comments }) => `
//     <div class="card" id="detail">
//       <header class="card-header" id="${beerId}">
//         <h2>${name}</h2>
//       </header>
//       <div class="card-content">
//         <div class="card-content-image">
//           <img src="${image ? image : '/src/images/default.jpg'}">
//         </div>
//         <div class="card-content-text">
//           <p>${description}
//           </p>
//           <div class="rating-container">
//             <i class="fa fa-calendar-o text-highlight" aria-hidden="true"></i> ${firstBrewed} &nbsp;&nbsp;
//             <i class="fa fa-heart-o text-highlight" aria-hidden="true"></i> ${likes} &nbsp;&nbsp;
//             <i class="fa fa-comment-o text-highlight" aria-hidden="true"></i> ${comments.length} &nbsp;&nbsp;
//           </div>
//         </div>
//       </div>
//     </div>
// `;


const detailTemplate = ({ beerId, name, brewersTips, description, image, firstBrewed, price, likes, comments }) => `
    <div class="detail-card" id="detail">
      <header class="detail-card-header" id="${beerId}">
        <h2>${name}</h2>
        <h3>~ ${brewersTips} ~</h3>
      </header>
      <div class="detail-card-content">
        <div class="detail-card-content-image">
          <img src="${image ? image : '/src/images/default.jpg'}">
          <br>
          <button class="button">I like</button>
        </div>
        <div class="detail-card-content-text">
          <div class="rating-container">
            <i class="fa fa-usd text-grey" aria-hidden="true"></i> ${price}&nbsp;&nbsp;
            <i class="fa fa-calendar-o text-grey" aria-hidden="true"></i> ${firstBrewed}&nbsp;&nbsp;
            <i class="fa fa-heart-o text-grey" aria-hidden = "true"></i> ${likes}&nbsp;&nbsp;
            <i class="fa fa-comment-o text-grey" aria-hidden="true"></i> ${comments.length}
          </div>
          <p>${description}</p>
        </div>
      </div>
    </div>
`;

export const renderDetail = async id => {
  
	// hide home elements
	document.querySelector('.div-presentation').style.display = 'none';
	document.querySelector('#appTitle').style.display = 'none';
  
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
