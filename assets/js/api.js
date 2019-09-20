'use strict';

const API_USER = 'ma.cardenas@nexuscode.com';
const API_KEY = '5B1BJZQ-5QYMSJG-NHK8Z2D-S8YJHDB';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/') => {
	const searchAPIEndpoint = `${API_URL}beers?search=`;
	const beersAPIEndpoint = `${API_URL}beers`;
	return {
		getBeers: async text => {
			try {
				const requestUrl = text ? `${searchAPIEndpoint}${text}` : beersAPIEndpoint;
				
				const response = await fetch(requestUrl, {
					'method': 'GET',
					'headers': {
						'user': API_USER,
						'X-API-KEY': API_KEY
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
				const response = await fetch(`${beersAPIEndpoint}/${id}`, {
					'method': 'GET',
					'headers': {
						'user': API_USER,
						'X-API-KEY': API_KEY
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
						'user': API_USER,
						'X-API-KEY': API_KEY
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
						'user': API_USER,
						'X-API-KEY': API_KEY,
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
