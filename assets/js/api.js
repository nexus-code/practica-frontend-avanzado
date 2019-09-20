'use strict';

import storage from './storage.js';
const { setItem, getItem } = storage('cookieStorage');

const API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/';


// search API_KEY on localStorage and API if not exist
async function getAPI_KEY() {

	// Change for email request ui:
	// setItem('apiUser', 'ma.cardenas@nexuscode.com');
	// setItem('apiUser', 'pepe@nexuscode.com');

	// look into local storage
	const apiKey = getItem('apiKey');
	if (apiKey !='')
		return apiKey;

	// else fetch to API
	try {
		
		const login = await fetch(`${API_URL}user/login`, {
			'method': 'POST',
			'body': JSON.stringify({email: getItem('apiUser')}),
			'headers': {'Content-Type': 'application/json'}
		});
		
		if (!login.ok) {
			setItem('apiKey', '');
			return '';
		}

		const loginData = await login.json();
		setItem('apiKey', loginData.user.apiKey); // view API details
		return loginData.user.apiKey;

	} catch (e) {
		console.error(e);
		return '';
	}
}


const api = () => {
	const searchAPIEndpoint = `${API_URL}beers?search=`;
	const beersAPIEndpoint = `${API_URL}beers`;

	return {
		getBeers: async text => {
			try {
				const requestUrl = text ? `${searchAPIEndpoint}${text}` : beersAPIEndpoint;
				const apiKey = await getAPI_KEY();
				if (apiKey == '')
					throw new Error('403 Error login');

				const response = await fetch(requestUrl, {
					'method': 'GET',
					'headers': {
						'user': getItem('apiUser'),
						'X-API-KEY': getItem('apiKey')
					}
				});
				if (!response.ok) {
					throw new Error('Error fetching beers');
				}
				const apiData = await response.json();

				const data = apiData.beers;
				const formatData = data.map(item => {
					if (item.beer) {
						return item.beer;
					}
					return item;
				});
				return formatData;
			} catch (err) {
				console.error(err.message);
				throw err;
			}
		},
		getBeerDetail: async id => {
			try {
				const apiKey = await getAPI_KEY();
				if (apiKey == '')
					throw new Error('403 Error login');

				const response = await fetch(`${beersAPIEndpoint}/${id}`, {
					'method': 'GET',
					'headers': {
						'user': getItem('apiUser'),
						'X-API-KEY': getItem('apiKey')
					}
				});
				if (!response.ok) {
					throw new Error('Error getting a beer');
				}
				const beer = await response.json();
				return beer;
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
		addLike: async id => {
			try {
				const response = await fetch(`${beersAPIEndpoint}/${id}/like`, {
					'method': 'POST',
					'headers': {
						'user': getItem('apiUser'),
						'X-API-KEY': getItem('apiKey')
					}
				});
				if (!response.ok) {
					throw new Error('Error postting like');
				}
				
				return 'OK';

			} catch (err) {
				console.error(err);
				throw err;
			}
		},
		createComment: async (id, comment) => {
			try {
				const response = await fetch(`${beersAPIEndpoint}/${id}/comment`, {
					method: 'POST',
					body: JSON.stringify({
						comment: comment
					}),
					headers: {
						'Content-type': 'application/json',
						'user': getItem('apiUser'),
						'X-API-KEY': getItem('apiKey')
					},
				});
				if (!response.ok) {
					throw new Error('Creating comment');
				}
				const responseBody = await response.json();
				return responseBody;
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
	};
};

export default api;
