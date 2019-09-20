'uses strict';

import { renderBeersDOM } from './beers.js';
import { renderDetail } from './detail.js';
import { renderLoader } from './ui.js';

import storage from './storage.js';
const { setItem, getItem } = storage('cookieStorage');

// const apiUser = getItem('apiUser');

// render request user email form, if not user register
const renderLoginForm = (method = '', detailId = 0) => {

	const mainSection = document.querySelector('main');

	mainSection.innerHTML = `
		<div class="login-input">
			<h2>Identificación de acceso</h2>
			<form id="login-form" class="login-form">
				<input id="email" placeholder="Add your email" type="text" required class="input">
				<button id="submitLogin" type="submit" class="button primary">Access</button>
			</form>
		</div>`;

	// eventListener over submitLike &  submitLike buttons (this button is dinamicaly created on detailTemplate)
	// Caution!!! this eventListener is over MAIN, can overwrite other behavoirs (caution on use evt.preventDefault())
	mainSection.addEventListener('click', async (evt) => {

		if (evt.target.id == 'submitLogin') {

			evt.preventDefault();

			const email = document.getElementById('email');
			setItem('apiUser', email.value);
			email.value = '';

			if (detailId == 0) {

				await renderBeersDOM(method);
			} else {

				await renderDetail(detailId);
			}
		}
	});

};

page('/', async (_, next) => {
	
	renderLoader('hide', 'show');

	const apiUser = getItem('apiUser');
	if (apiUser == '') {
		renderLoginForm();
	} else {
		await renderBeersDOM();
	}

	next();
}, () => {
	
	renderLoader('show', 'hide');
});

page('/latests/', async (_, next) => {

	renderLoader('hide', 'show');

	const apiUser = getItem('apiUser');
	if (apiUser == '') {
		renderLoginForm('bfLatests');
	} else {
		await renderBeersDOM('bfLatests');
	}

	next();
}, () => {
	renderLoader('show', 'hide');
});

page('/mostvalued/', async (_, next) => {

	renderLoader('hide', 'show');

	const apiUser = getItem('apiUser');
	if (apiUser == '') {
		renderLoginForm('bfMostValued');
	} else {
		await renderBeersDOM('bfMostValued');
	}

	next();
}, () => {
	renderLoader('show', 'hide');
});

page('/detail/:id', async (ctx, next) => {
	renderLoader('hide', 'show');

	const apiUser = getItem('apiUser');
	if (apiUser == '') {
		renderLoginForm('', ctx.params.id);
	} else {
		await renderDetail(ctx.params.id);
	}

	next();
}, ctx => {
	renderLoader('show', 'hide');
});

page();