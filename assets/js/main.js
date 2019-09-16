'use strict';

// show or hide navbar logo when appSubTitle hides or shows on scrolling (10px margin)
window.addEventListener('scroll', function () {

	const logo = document.getElementById('logo');
	const appSubTitle = document.querySelector('#appSubTitle');
	var appSubTitlePos = appSubTitle.getBoundingClientRect();
	console.log('appSubTitlePos.top', appSubTitlePos.top );

	if (appSubTitlePos.top < 10) {
		logo.style.display = 'block';
	} else {
		logo.style.display = 'none';
	}
});