'use strict';

// show or hide navbar logo when appSubTitle hides or shows on scrolling (10px margin)
//
window.addEventListener('scroll', function () {

	const logo = document.getElementById('logo');
	const appSubTitle = document.querySelector('#appSubTitle');
	var appSubTitlePos = appSubTitle.getBoundingClientRect();	// appSubTitle element Position. DIV & H1 has top = 0!

	if (appSubTitlePos.top < 10) {
		logo.style.display = 'block';
	} else {
		logo.style.display = 'none';
	}
});