import api from './api.js';

const { getBeerDetail } = api();
const { addLike } = api();
const { createComment } = api();


const commentTemplate = ({ dateComment, comment }) => `
  <div class="list-item">
    <p><span>${dateComment}</span><br>${comment}</p>
  </div>
`;

// optimize with detailTemplate?
const renderComments = comment => {

	// beer.comments is empty. When a comment is added, API create property comment[]
	if (typeof comment == 'undefined')
		return;
		
	document.querySelector('#commentsLength').innerHTML = comment.length;
	document.querySelector('#commentsList').innerHTML = comment.map(input => commentTemplate(input)).join('');
};

const detailTemplate = ({ beerId, name, brewersTips, description, image, firstBrewed, price, likes, comment }) => {
	
	let commentsList = '<b>There is no comments</b>';
	let commentsLength = 0;

	// beer.comments is empty. When a comment is added, API create property comment[]
	if (typeof comment != 'undefined') 
		commentsLength = comment.length;
	
	if (commentsLength > 0)
		commentsList = comment.map(input => commentTemplate(input)).join('');

	return `<div class="detail-card" id="detail">
				<header class="detail-card-header" id="${beerId}">
				<h2>${name}</h2>
				<h3><i class="fa fa-comment-left" aria-hidden="true"></i> ${brewersTips} <i class="fa fa-comment-right" aria-hidden="true"></i></h3>
				</header>
				<div class="detail-card-content">
					<div class="detail-card-content-image">
						<img src="${image ? image : '/src/images/default.jpg'}" alt="${name}">
						<br>
						<button id="submitLike">I like</button>
					</div>
					<div class="detail-card-content-text">
						<div class="rating-container">
						<i class="fa fa-usd text-grey" aria-hidden="true"></i> ${price}&nbsp;&nbsp;
						<i class="fa fa-calendar-o text-grey" aria-hidden="true"></i> ${firstBrewed}&nbsp;&nbsp;
						<i class="fa fa-heart-o text-grey" aria-hidden = "true"></i> <span id="likes">${likes}</span>&nbsp;&nbsp;
						<i class="fa fa-comment-o text-grey" aria-hidden="true"></i> <span id="commentsLength">${commentsLength}</span>
						</div>
						<p>${description}</p>
					</div>
				</div>
				<h2>Comments</h2>
				<div class="comment-list" id="commentsList">${commentsList}</div>
				<div class="comment-input">
					<form id="comment-form" class="comment-form">
						<label for="commentInput">Comment this beer:</label>
						<input id="commentInput" placeholder="Add your comment" type="text" required class="input">
						<button id="submitComent" type="submit" class="button primary">Add</button>
					</form>
				</div>
			</div>`;
};

function hidePresentation() {

	// hide presentation elements in detail
	document.querySelector('.div-presentation').style.display = 'none';
	document.querySelector('#appTitle').style.display = 'none';

	// menu selector
	document.querySelector('#menuHome').classList.remove('active');
}

// return to get detail to update likes and comment(s)
async function updateDetailView(id) {

	try {

		const beerTmp = await getBeerDetail(id);
		const beer  = beerTmp.beer;
		document.querySelector('#likes').innerHTML = beer.likes;

		if (beer.hasOwnProperty('comment'))
			renderComments(beer.comment);

	} catch (e) {
		console.error(e);
	}
}

export const renderDetail = async id => {
  
	hidePresentation();

	const mainDiv = document.querySelector('main');

	try {
		
		const [beerTmp] = await Promise.all([getBeerDetail(id)]);
		const beer = beerTmp.beer;
		const beerHTML = detailTemplate(beer);
		mainDiv.innerHTML = beerHTML;
	} catch (e) {
		console.error(e);
	} finally {
		window.scrollTo(0, 0);
	}
  
	// eventListener over submitLike &  submitLike buttons (this button is dinamicaly created on detailTemplate)
	// Caution!!! this eventListener is over MAIN, can overwrite other behavoirs (caution on use evt.preventDefault())
	mainDiv.addEventListener('click', async (evt) => {
		
		if (evt.target.id == 'submitLike') {
			await addLike(id);
			updateDetailView(id);
		}

		if (evt.target.id == 'submitComent') {

			evt.preventDefault();

			const commentInput = document.getElementById('commentInput');
			await createComment(id, commentInput.value);
			commentInput.value = '';
			updateDetailView(id);
		}
	});
};