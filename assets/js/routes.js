'uses strict';

import './navbar.js';

// import { renderQuotes } from './quotes.js';
import { renderBeersDOM } from './beers.js';
import { renderDetail } from './detail.js';
import { renderLoader } from './ui.js';


page('/', async (_, next) => {
	
	renderLoader('hide', 'show');
	// hideQuotes();
	// handleFilter('no-filter', 'filter');
	// handleMainContainer('detail-page', 'home-page');
	// handleForm('none');
	await renderBeersDOM();
	next();
}, () => {
	renderLoader('show', 'hide');
});

page('/mostvalued/', async (_, next) => {

	renderLoader('hide', 'show');
	// hideQuotes();
	// handleFilter('no-filter', 'filter');
	// handleMainContainer('detail-page', 'home-page');
	// handleForm('none');
	await renderBeersDOM('mostValued');
	next();
}, () => {
	renderLoader('show', 'hide');
});

page('/detail/:id', async (ctx, next) => {
	renderLoader('hide', 'show');
	// handleFilter('filter', 'no-filter');
	// handleMainContainer('home-page', 'detail-page');
	// handleForm('block');
	await renderDetail(ctx.params.id);
	next();
}, ctx => {
	renderLoader('show', 'hide');
	// addQuoteListeners(ctx.params.id);
});

page();