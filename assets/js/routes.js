'uses strict';

import './navbar.js';
import { renderBeersDOM } from './beers.js';
import { renderDetail } from './detail.js';
import { renderLoader } from './ui.js';


page('/', async (_, next) => {
	
	renderLoader('hide', 'show');
	// handleMainContainer('detail-page', 'home-page');
	await renderBeersDOM();
	next();
}, () => {
	renderLoader('show', 'hide');
});

page('/latests/', async (_, next) => {

	renderLoader('hide', 'show');
	// handleMainContainer('detail-page', 'home-page');
	await renderBeersDOM('bfLatests');
	next();
}, () => {
	renderLoader('show', 'hide');
});

page('/mostvalued/', async (_, next) => {

	renderLoader('hide', 'show');
	// handleMainContainer('detail-page', 'home-page');
	await renderBeersDOM('bfMostValued');
	next();
}, () => {
	renderLoader('show', 'hide');
});

page('/detail/:id', async (ctx, next) => {
	renderLoader('hide', 'show');
	// handleMainContainer('home-page', 'detail-page');
	await renderDetail(ctx.params.id);
	next();
}, ctx => {
	renderLoader('show', 'hide');
});

page();