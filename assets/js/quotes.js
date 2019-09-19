import api from './api.js';

const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1';

const { createQuote } = api(QUOTES_API);

const quoteTemplate = (quote) => `
  <div class="list-item">
    <p>${quote}</p>
  </div>
`;

export const showQuotesForm = () =>
  detailSection.innerHTML = `
    <div id="detail" class="detail-content"></div>
    <div class="quotes-list">
      <h2>Quotes</h2>
      <div id="quoteList">
      </div>
    </div>
    <form id="quote-form" class="quote-form" novalidate>
      <div class="quote-input">
        <label for="quote">Quote of this show</label>
        <input required id="quote" placeholder="Add your quote" class="input primary" type="text">
      </div>
      <button type="submit" class="button primary">Add quote</button>
    </form>
  `;
export const hideQuotesForm = () =>
  detailSection.innerHTML = '';

export const addQuoteListeners = id => {
	const quoteForm = document.getElementById('quote-form');
	const quoteInput = document.getElementById('quote');

	quoteInput.addEventListener('change', (evt) => {
		quoteInput.value = evt.target.value;
	});

	quoteForm.addEventListener('submit', async (evt) => {
		evt.preventDefault();
		try {
			const quote = await createQuote(id, quoteInput.value);
			// const beer = await getBeer(id);
			document.getElementById('quoteList').innerHTML += quoteTemplate(quoteInput.value);
		} catch (e) {
			console.error(e);
		}
  });
};