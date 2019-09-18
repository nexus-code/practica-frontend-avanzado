'use strict';

// 1
// const myCredentials = () => async value => {

// 	const response = await fetch('assets/credentials/response_1568688711912.json');
// 	if (!response.ok) {
// 		throw new Error('Error fetching credentials');
// 	}
// 	const quotes = await response.json();
// 	console.log('quotes', quotes);
// 	console.log('user', quotes.user);
// 	console.log('user.email', quotes.user.email);
// 	console.log('user.apiKey', quotes.user.apiKey);
// 	return quotes;
// }

// const test = myCredentials();
// test();

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
						'user': 'ma.cardenas@nexuscode.com',
						'X-API-KEY': '5B1BJZQ-5QYMSJG-NHK8Z2D-S8YJHDB'
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
						'user': 'ma.cardenas@nexuscode.com',
						'X-API-KEY': '5B1BJZQ-5QYMSJG-NHK8Z2D-S8YJHDB'
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
						'user': 'ma.cardenas@nexuscode.com',
						'X-API-KEY': '5B1BJZQ-5QYMSJG-NHK8Z2D-S8YJHDB'
					}
				});
				if (!response.ok) {
					throw new Error('Error postting like');
				}
				
    			// console.log('API addLike', id);
				return 'OK';

			} catch (err) {
				console.error(err);
				throw err;
			}
		},
		// getQuotes: async id => {
		// 	try {
		// 		const response = await fetch(`${API_URL}/quote/${id}`);
		// 		if (!response.ok) {
		// 			throw new Error('Error fetching quotes');
		// 		}
		// 		const quotes = await response.json();
		// 		return quotes;
		// 	} catch (err) {
		// 		console.error(err);
		// 		throw err;
		// 	}
		// },
		// createQuote: async (id, text) => {
		// 	try {
		// 		const response = await fetch(`${API_URL}/quote/${id}`, {
		// 			method: 'POST',
		// 			body: JSON.stringify({
		// 				quote: text
		// 			}),
		// 			headers: {
		// 				'Content-type': 'application/json',
		// 				'X-API-KEY': API_KEY,
		// 			},
		// 		});
		// 		if (!response.ok) {
		// 			throw new Error('Creating quote');
		// 		}
		// 		const responseBody = await response.json();
		// 		return responseBody;
		// 	} catch (err) {
		// 		console.error(err);
		// 		throw err;
		// 	}
		// },
	};
};

export default api;
